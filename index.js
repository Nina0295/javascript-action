const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');
const moment = require('moment');

async function run() {
  try {
    const token = core.getInput('token');
    const ownerName = core.getInput('owner-name');
    const repoName = core.getInput('repo-name');
    const octokit = new Octokit({ auth: token });

    const currentDate = moment();
    const startDate = moment(core.getInput('start-date'));
    const endDate = moment(core.getInput('end-date'));

    // Validate input dates
    if (!startDate.isValid() || !endDate.isValid()) {
        throw new Error('Invalid date format');
    }

    const issues = await octokit.paginate(octokit.issues.listForRepo, {
        owner: ownerName,
        repo: repoName,
        state: 'all',
    }).catch(err => {
        throw new Error(`Failed to retrieve issues: ${err.message}`);
    });

    const pullRequests = await octokit.paginate(octokit.pulls.list, {
        owner: ownerName,
        repo: repoName,
        state: 'all',
    }).catch(err => {
        throw new Error(`Failed to retrieve pull requests: ${err.message}`);
    });

    // Filter issues and pull requests by date
    const lastMonthIssues = issues.filter(issue => moment(issue.created_at).isBetween(currentDate.clone().subtract(1, 'month'), currentDate));
    const customDateForIssues = issues.filter(issue => moment(issue.created_at).isBetween(startDate.clone(), endDate));
    const lastMonthPullRequests = pullRequests.filter(pullRequest => moment(pullRequest.created_at).isBetween(currentDate.clone().subtract(1, 'month'), currentDate));
    const customDateForPullRequests = pullRequests.filter(pullRequest => moment(pullRequest.created_at).isBetween(startDate.clone(), endDate));

    // Count the number of issues and pull requests
    const totalIssues = issues.length;
    const openIssues = issues.filter(issue => issue.state === 'open').length;
    const closedIssues = issues.filter(issue => issue.state === 'closed').length;
    const lastMonthIssuesCount = lastMonthIssues.length;
    const customDateForIssuesCount = customDateForIssues.length;

    const totalPullRequests = pullRequests.length;
    const openPullRequests = pullRequests.filter(pullRequest => pullRequest.state === 'open').length;
    const closedPullRequests = pullRequests.filter(pullRequest => pullRequest.state === 'closed').length;
    const lastMonthPullRequestsCount = lastMonthPullRequests.length;
    const customDateForPullRequestsCount = customDateForPullRequests.length;

    // Output the information
    core.setOutput('total-issues', totalIssues);
    core.setOutput('open-issues', openIssues);
    core.setOutput('closed-issues', closedIssues);
    core.setOutput('last-month-issues', lastMonthIssuesCount);
    core.setOutput('custom-date-for-issues', customDateForIssuesCount);

    core.setOutput('total-pull-requests', totalPullRequests);
    core.setOutput('open-pull-requests', openPullRequests);
    core.setOutput('closed-pull-requests', closedPullRequests);
    core.setOutput('last-month-pull-requests', lastMonthPullRequestsCount);
    core.setOutput('custom-date-for-pull-requests', customDateForPullRequestsCount);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

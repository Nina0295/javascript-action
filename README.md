# Action Info
This repository contains a simple JavaScript action that retrieves and displays information about the checkout action in the actions organization. The action leverages GitHub API to provide data on the number of open and closed issues and pull requests, as well as the total number of issues and pull requests for the checkout action. It also offers insights into the number of issues and pull requests opened in the last month or a custom date range. The code is well-documented, making it easy for you to understand and customize the action to fit needs. Simply follow the instructions in the documentation to specify the name of the action and the desired date range to retrieve and display the requested information.

## Input Variables

The following input variables are required to run the action:

### token 
**Required** Personal access token with access to the repository. Default `${{ secrets.GITHUB_TOKEN }}`.

### owner-name 
**Required** The owner name of the repository. Default `"actions"`.

### repo-name 
**Required** The name of the repository. Default `"checkout"`.

The following input variables are optional to run the action:

### start-date 
The start date to filter the issues and pull requests. Optional input. Default `"2022-02-24T00:00:00Z"`.

### end-date 
The end date to filter the issues and pull requests. Optional input. Default `"2023-03-12T00:00:00Z"`.

## Output Variables
The action outputs the following variables:

### total-issues
The total number of issues.

### open-issues
The number of open issues.

### closed-issues
The number of closed issues.

### last-month-issues
The number of issues created in the last month.

### custom-date-for-issues
The number of issues created since the custom date.

### total-pull-requests
The total number of pull requests.

### open-pull-requests
The number of open pull requests.

### closed-pull-requests
The number of closed pull requests.

### last-month-pull-requests
The number of pull requests created in the last month.

### custom-date-for-pull-requests
The number of pull requests created since the custom date.

## Example usage
The action code is implemented in JavaScript and uses the @actions/core, @actions/github, and moment modules. The code fetches the issues and pull requests from the repository or the "actions/checkout" repository, counts the number of issues and pull requests, and outputs the variables.

You can run the action in your workflow using the following syntax:

```yaml
- name: Get issues and pull requests
  uses: <your-username>/<your-repo-name>/<path-to-action>
  with:
    token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
    owner-name: <owner-name>
    repo-name: <repo-name>
    start-date: <start-date>
    end-date: <end-date>
 ```   
You should replace ```<your-username>, <your-repo-name>, <path-to-action>, <owner-name>, <repo-name>, <start-date> and <end-date>``` with your own values.

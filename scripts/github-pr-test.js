import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function checkPRAccess() {
  try {
    // List pull requests to verify access
    const { data: pullRequests } = await octokit.rest.pulls.list({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      state: 'all'
    });
    
    console.log('Successfully listed pull requests. PR access confirmed.');
    console.log(`Found ${pullRequests.length} pull requests`);

    // Create a new branch
    const { data: ref } = await octokit.rest.git.getRef({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      ref: 'heads/main'
    });

    const newBranchName = `docs/pr-test-${Date.now()}`;
    await octokit.rest.git.createRef({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      ref: `refs/heads/${newBranchName}`,
      sha: ref.object.sha
    });

    console.log(`Created new branch: ${newBranchName}`);

    // Update README
    const { data: readme } = await octokit.rest.repos.getContent({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      path: 'README.md'
    });

    const content = Buffer.from(readme.content, 'base64').toString();
    const updatedContent = content + '\n\n## Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n';

    await octokit.rest.repos.createOrUpdateFileContents({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      path: 'README.md',
      message: 'docs: add contributing section',
      content: Buffer.from(updatedContent).toString('base64'),
      branch: newBranchName,
      sha: readme.sha
    });

    console.log('Updated README.md in test branch');

    // Create pull request
    const { data: pr } = await octokit.rest.pulls.create({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      title: 'docs: add contributing section to README',
      body: 'This is a test PR to verify GitHub API access.',
      head: newBranchName,
      base: 'main'
    });

    console.log(`Created test PR #${pr.number}`);

    // Close pull request
    await octokit.rest.pulls.update({
      owner: 'nemolize',
      repo: 'pomodoro-timer',
      pull_number: pr.number,
      state: 'closed'
    });

    console.log(`Closed test PR #${pr.number}`);
    
    return true;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}

checkPRAccess();

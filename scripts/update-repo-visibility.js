import { Octokit } from "@octokit/rest";

async function updateRepoVisibility() {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    // Update repository visibility
    await octokit.repos.update({
      owner: "nemolize",
      repo: "pomodoro-timer",
      private: true
    });
    
    // Verify the change
    const { data: repo } = await octokit.repos.get({
      owner: "nemolize",
      repo: "pomodoro-timer"
    });
    
    console.log(`Repository visibility updated successfully.`);
    console.log(`Current visibility status: ${repo.private ? 'private' : 'public'}`);
    
  } catch (error) {
    console.error('Error updating repository visibility:', error.message);
    process.exit(1);
  }
}

updateRepoVisibility();

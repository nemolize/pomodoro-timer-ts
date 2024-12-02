import { Octokit } from "@octokit/rest";
import { execSync } from 'child_process';

async function renameRepository() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  
  try {
    await octokit.rest.repos.update({
      owner: "nemolize",
      repo: "pomodoro-timer-ts",
      name: "pomodoro-timer"
    });
    console.log("Repository renamed successfully!");
    
    // Update local git remote
    execSync('git remote set-url origin https://github.com/nemolize/pomodoro-timer.git');
    console.log("Local git remote URL updated!");
    
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

renameRepository();

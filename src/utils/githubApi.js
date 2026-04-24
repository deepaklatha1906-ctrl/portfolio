const GITHUB_USERNAME = 'deepaklatha1906-ctrl';

export async function fetchGithubData() {
  try {
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
    const repos = await reposResponse.ok ? await reposResponse.json() : [];

    // Filter out the portfolio repo itself or forks if desired
    const filteredRepos = repos.filter(repo => !repo.fork);

    // Transform repos to projects format
    const projects = filteredRepos.map(repo => ({
      id: repo.id.toString(),
      title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
      description: repo.description || 'No description provided.',
      techStack: [repo.language, ...(repo.topics || [])].filter(Boolean),
      version: '1.0', // GitHub doesn't give a simple "version" string easily
      github: repo.html_url,
      live: repo.homepage,
      updated_at: repo.updated_at,
      visualizationData: [
        { name: 'Commits', value: Math.floor(Math.random() * 50) + 10 }, // Placeholder logic
        { name: 'Stars', value: repo.stargazers_count },
        { name: 'Forks', value: repo.forks_count }
      ]
    }));

    // Aggregate skills
    const languageStats = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
      if (repo.topics) {
        repo.topics.forEach(topic => {
          languageStats[topic] = (languageStats[topic] || 0) + 0.5; // Topics count less than primary language
        });
      }
    });

    const skills = Object.entries(languageStats)
      .map(([name, count]) => {
        // Simple proficiency calculation based on usage count
        const proficiency = Math.min(70 + (count * 5), 98); 
        return {
          id: name.toLowerCase(),
          name,
          proficiency: Math.round(proficiency),
          description: `Extensively used in ${Math.ceil(count)} project(s) on GitHub, including ${repos.filter(r => r.language === name || r.topics?.includes(name)).map(r => r.name).slice(0, 2).join(', ')}.`,
          category: 'github-derived',
          color: getLanguageColor(name)
        };
      })
      .sort((a, b) => b.proficiency - a.proficiency)
      .slice(0, 8); // Top 8 skills

    return { projects, skills };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return null;
  }
}

function getLanguageColor(lang) {
  const colors = {
    'JavaScript': '#f7df1e',
    'Python': '#3776ab',
    'HTML': '#e34f26',
    'CSS': '#1572b6',
    'TypeScript': '#3178c6',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'PHP': '#4f5d95',
    'Ruby': '#701516',
    'Go': '#00add8'
  };
  return colors[lang] || '#' + Math.floor(Math.random()*16777215).toString(16);
}

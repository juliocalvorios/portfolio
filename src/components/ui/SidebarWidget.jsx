import { useState, useEffect } from 'react'
import { CloudSun, Moon, GitCommit, ArrowUpRight } from 'lucide-react'

const GITHUB_USERNAME = 'juliocalvorios'

// Repos to fetch commits from (in priority order)
const REPOS = [
  'portfolio',
  'Through-The-Glass-Project',
  'the-impossible-form',
  'Ontario-Flag-Project',
  'react-ai-highlight-parser',
]

/**
 * SidebarWidget - Combined Index + GitHub Activity + Weather
 * Fetches real commits from GitHub API
 */
function SidebarWidget({ projects, onProjectClick, playClick, playHover }) {
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Fetch GitHub commits from multiple repos
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Fetch commits from each repo in parallel
        const commitPromises = REPOS.map(async (repo) => {
          try {
            const response = await fetch(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=3`
            )
            if (!response.ok) return []
            const commits = await response.json()
            return commits.map(c => ({
              message: c.commit.message.split('\n')[0],
              repo: repo,
              date: new Date(c.commit.author.date),
              sha: c.sha,
            }))
          } catch {
            return []
          }
        })

        const allCommitsArrays = await Promise.all(commitPromises)
        const allCommits = allCommitsArrays.flat()

        // Sort by date descending and take top 3
        const sortedCommits = allCommits
          .sort((a, b) => b.date - a.date)
          .slice(0, 3)

        setCommits(sortedCommits)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch GitHub commits:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchCommits()
  }, [])

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Format relative time
  const formatRelativeTime = (date) => {
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  // Truncate commit message
  const truncateMessage = (msg, maxLength = 32) => {
    if (msg.length <= maxLength) return msg
    return msg.slice(0, maxLength).trim() + '...'
  }

  // Truncate project title by characters for consistent length
  const truncateTitle = (title, maxLength = 34) => {
    if (title.length <= maxLength) return title
    return title.slice(0, maxLength).trim() + '..'
  }

  // Time and weather
  const hour = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const hour12 = hour % 12 || 12
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`
  const isDay = hour >= 6 && hour < 20

  return (
    <div className="border-2 border-neutral-800 bg-paper">
      {/* Section A: Article Index */}
      <div className="border-b border-neutral-300 px-3 py-2">
        <h3 className="text-[10px] sm:text-xs tracking-wider sm:tracking-widest font-bold text-center">
          IN THIS EDITION
        </h3>
      </div>
      
      <nav className="p-3 space-y-2 border-b border-neutral-200">
        {projects.map((project, i) => (
          <a
            key={project.id}
            href={`#project-${project.id}`}
            className="flex items-baseline gap-3 group"
            onClick={(e) => {
              e.preventDefault()
              playClick()
              onProjectClick && onProjectClick(project)
            }}
            onMouseEnter={playHover}
          >
            <span className="text-neutral-400 font-mono text-xs leading-tight">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm text-neutral-600 font-serif group-hover:text-neutral-900 transition-colors leading-tight">
              {truncateTitle(project.title)}
            </span>
          </a>
        ))}
      </nav>

      {/* Section C1: GitHub Activity */}
      <div className="border-b border-neutral-300 px-3 py-2 bg-neutral-50/50">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] tracking-wider font-bold">LATEST COMMITS</h3>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] text-neutral-400 hover:text-neutral-700 flex items-center gap-0.5 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            GitHub <ArrowUpRight className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      <div className="p-3 space-y-2.5 border-b border-neutral-200">
        {loading ? (
          // Loading state
          <div className="flex items-center justify-center py-2">
            <div className="w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
          </div>
        ) : error ? (
          // Error state - graceful fallback
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2 text-[11px] text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>View activity on GitHub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ) : commits.length === 0 ? (
          // No commits found
          <p className="text-[10px] text-neutral-400 text-center py-2">
            No recent commits
          </p>
        ) : (
          // Commits list
          commits.map((commit, i) => (
            <div key={i} className="flex items-start gap-2">
              <GitCommit className="w-3 h-3 text-neutral-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-neutral-700 leading-tight">
                  {truncateMessage(commit.message)}
                </p>
                <p className="text-[9px] text-neutral-400 mt-0.5">
                  {formatRelativeTime(commit.date)} · {commit.repo}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Weather Footer */}
      <div className="px-3 py-2 bg-neutral-50/50">
        <div className="flex items-center justify-between text-[9px] text-neutral-500">
          <div className="flex items-center gap-1.5">
            {isDay ? (
              <CloudSun className="w-3 h-3" />
            ) : (
              <Moon className="w-3 h-3" />
            )}
            <span className="font-medium">-4°C</span>
            <span className="text-neutral-400">Toronto</span>
          </div>
          <div className="text-neutral-400">
            <span>{formattedTime} EST</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarWidget

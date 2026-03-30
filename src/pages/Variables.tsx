import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getVariableList } from '../api/nhtsa'

export function Variables() {
  const { data, error, isPending } = useQuery({
    queryKey: ['variables'],
    queryFn: getVariableList,
  })

  if (isPending) return <p>Loading variables…</p>
  if (error) return <p className="fetch-error">Failed to load variables: {error.message}</p>

  return (
    <div className="variables">
      <h1>Vehicle Variables</h1>
      <ul className="variable-list">
        {data.Results.map(v => (
          <li key={v.ID}>
            <Link to={`/variables/${v.ID}`}>
              <span className="variable-name">{v.Name}</span>
              {v.Description && (
                <span className="variable-desc" dangerouslySetInnerHTML={{ __html: v.Description }} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

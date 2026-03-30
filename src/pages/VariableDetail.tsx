import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import { getVariableList } from '../api/nhtsa'

export function VariableDetail() {
  const { variableId } = useParams<{ variableId: string }>()

  const { data, error, isPending } = useQuery({
    queryKey: ['variables'],
    queryFn: getVariableList,
  })

  if (isPending) return <p>Loading…</p>
  if (error) return <p className="fetch-error">Failed to load: {error.message}</p>

  const variable = data.Results.find(v => v.ID === Number(variableId))

  if (!variable) return <p>Variable not found.</p>

  return (
    <div className="variable-detail">
      <Link to="/variables" className="back-link">← Back to Variables</Link>
      <h1>{variable.Name}</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{variable.ID}</td>
          </tr>
          <tr>
            <th>Data Type</th>
            <td>{variable.DataType}</td>
          </tr>
          {variable.GroupName && (
            <tr>
              <th>Group</th>
              <td>{variable.GroupName}</td>
            </tr>
          )}
          {variable.Description && (
            <tr>
              <th>Description</th>
              <td>{variable.Description}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

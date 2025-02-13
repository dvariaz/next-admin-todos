import { getTodos } from '@/features/todos/actions/todos-actions';
import TodosGridServerContainer from '@/features/todos/containers/TodosGridServerContainer';

export const metadata = {
  title: 'REST Todos',
  description: 'Todos fetched using REST API',
}

const DashboardSeverTodosPage = async () => {
  const todos = await getTodos();

  return (
    <div>
      <TodosGridServerContainer todos={todos} />
    </div>
  )
}

export default DashboardSeverTodosPage;
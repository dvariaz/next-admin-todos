import TodosGridRestContainer from '@/features/todos/containers/TodosGridRestContainer';

export const metadata = {
  title: 'REST Todos',
  description: 'Todos fetched using REST API',
}

const DashboardRestTodosPage = async () => {
  const todosResponse = await fetch(`${process.env.BASE_URL}/api/todos`)
  const todos = await todosResponse.json();

  return (
    <div>
      <TodosGridRestContainer todos={todos} />
    </div>
  )
}

export default DashboardRestTodosPage
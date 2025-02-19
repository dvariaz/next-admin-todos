import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/config';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>
        <h1>Serverside User connected</h1>

        <pre>
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default DashboardPage;

import TabBar from '@/features/shared/components/TabBar';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Cookies',
  description: 'Cookies page',
}

const DashboardCookies = async () => {
  const currentTabId = (await cookies()).get('dashboard-tab__current-tab-id')?.value;
  
  const handleChangeTab = async (tabId: string) => {
    'use server';
    console.log('Changing tab', tabId);

    (await cookies()).set('dashboard-tab__current-tab-id', tabId);
    revalidatePath('/dashboard/cookies');
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <TabBar
        currentTabId={currentTabId}
        tabItems={[
          {id: '0', label: 'Tab 1'},
          {id: '1', label: 'Tab 2'},
          {id: '2', label: 'Tab 3'}
        ]}
        onChangeTab={handleChangeTab}/>
    </div>
  )
}

export default DashboardCookies;
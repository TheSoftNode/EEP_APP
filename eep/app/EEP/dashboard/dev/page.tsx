import CloudDevDashboard from '@/components/EEP/Dashboard/CloudDevDashboard';
import EnhancedDevDashboard from '@/components/EEP/Dashboard/EnhancedDevDashboard';

// export default function DevPage() {
//     return <CloudDevDashboard />;
// }

export default function DevPage() {
    return (
        <div className='mt-12'>
            <EnhancedDevDashboard />;

        </div>
    )
}
import HistoryTable from '../components/History';
import Navbar from '../components/Navbar';



const History = () => {
  return (<>
  
  <Navbar/>
  <div >
<h1 className="font-playfair italic text-3xl font-bold text-center mt-30 mb-5 text-blue-700">
    Your History</h1>
  </div>
  <div className="mt-10 min-h-screen py-10 px-4">
     
<HistoryTable/>
    </div>
  </>
  
  );
};

export default History;

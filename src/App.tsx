import './App.css';

import Tabs from '@/components/Tabs';
import TicTacToe from '@/apps/TicTacToe';
import ProductList from '@/apps/ProductList';

let app = function AppShowcase() {
  const myTabs = [
    {
      label: 'Tic-Tac-Toe',
      content: <TicTacToe />,
    },
    {
      label: 'ProductList',
      content: <ProductList />,
    },
  ];

  return (
    <div className="bg_gradient">
      <div className="py-2 px-2 sm:px-6 lg:px-8">
          <Tabs tabs={myTabs} defaultActive={0} />
      </div>
    </div>
  );
}

export default app;

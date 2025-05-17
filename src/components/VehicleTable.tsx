import { ArrowUpDown, Download, Menu } from 'lucide-react';
import React from 'react';

export interface VehicleTableProps {
  vehicles: any[];
  nullValue?: string;
  isShowTableBar?: boolean;
  isShowIndex?: boolean;
  isLoading?: boolean;
  searchOptions?: { label: string; value: string }[];
  filterOptions?: { label: string; value: string }[];
  sortOptions?: { label: string; value: string }[];
  currentPage?: number;
  totalRecords?: number;
  lastPage?: number;
  pageSize?: number;
  onApplyFilter?: (filter: any) => void;
  onApplySort?: (sort: any) => void;
  onClickRow?: (row: any) => void;
  onChangePage?: (page: number) => void;
  onSearch?: (search: any) => void;
}

const defaultSearchOptions = [
  { label: 'Search Option', value:  '' },
  { label: 'VIN Number', value: 'vin_number' },
  { label: 'Model', value: 'model' },
  { label: 'Dealer Name', value: 'dealer_name' },
];

const defaultFilterOptions = [
  { label: 'Filter', value: '' },
  { label: 'Sedan', value: 'Sedan' },
  { label: 'SUV', value: 'SUV' },
  { label: 'Truck', value: 'Truck' },
];

const defaultSortOptions = [
  { label: 'Sort By', value: '' },
  { label: 'Model', value: 'model' },
  { label: 'Order Date', value: 'order_date' },
  { label: 'Purchase Price', value: 'purchase_price' },
];

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles,
  nullValue = '-',
  isShowTableBar = true,
  isShowIndex = true,
  isLoading = false,
  searchOptions = defaultSearchOptions,
  filterOptions = defaultFilterOptions,
  sortOptions = defaultSortOptions,
  currentPage = 1,
  totalRecords = 0,
  lastPage = 1,
  pageSize = 10,
  onApplyFilter,
  onApplySort,
  onClickRow,
  onChangePage,
  onSearch,
}) => {
  // Local state for search/filter/sort input
  const [searchField, setSearchField] = React.useState(searchOptions[0]?.value || '');
  const [searchValue, setSearchValue] = React.useState('');
  const [filterValue, setFilterValue] = React.useState(filterOptions[0]?.value || '');
  const [sortField, setSortField] = React.useState(sortOptions[0]?.value || '');
  const [sortDirection, setSortDirection] = React.useState<'ASC' | 'DESC'>('ASC');

  const handleSearch = () => {
    if (onSearch) onSearch({ [searchField]: searchValue });
  };

  const handleFilter = (value: string) => {
    setFilterValue(value);
    if (onApplyFilter) onApplyFilter({ type: value });
  };

  const handleSort = () => {
    if (onApplySort) onApplySort({ field_name: sortField, direction: sortDirection });
  };

  return (
    <div className="p-10 flex flex-col items-end">
      <div className="mb-4 text-gray-500">{totalRecords} Rows</div>
      {isShowTableBar && (
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center rounded shadow px-2">
            <select
              className="bg-gray-800 text-white px-2 py-2 rounded-l outline-none"
              value={searchField}
              onChange={e => setSearchField(e.target.value)}
            >
              {searchOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <input
              className="bg-gray-700 px-2 py-2 rounded-r outline-none text-white"
              placeholder="Search text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <button className="ml-2 px-3 py-2 bg-blue-500 text-white rounded" onClick={handleSearch}>Search</button>
          </div>
          <select
            className="bg-gray-800 text-white px-4 py-2 rounded font-semibold"
            value={filterValue}
            onChange={e => handleFilter(e.target.value)}
          >
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="flex items-center">
            <select
              className="bg-gray-800 text-white px-2 py-2 rounded-l outline-none"
              value={sortField}
              onChange={e => setSortField(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <select
              className="bg-gray-800 text-white px-2 py-2 rounded-r outline-none"
              value={sortDirection}
              onChange={e => setSortDirection(e.target.value as 'ASC' | 'DESC')}
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 font-semibold text-white"><span className="mr-2"><Download /></span>Export</button>
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              {isShowIndex && <th className="px-4 py-2">No.</th>}
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Model Code</th>
              <th className="px-4 py-2">Order date</th>
              <th className="px-4 py-2">Dealer Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={8} className="text-center py-8">Loading...</td></tr>
            ) : vehicles.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-8">No data</td></tr>
            ) : (
              vehicles.map((vehicel, idx) => (
                <tr
                  key={vehicel.id || idx}
                  className="border-t border-gray-200 cursor-pointer"
                  onClick={() => onClickRow && onClickRow(vehicel)}
                >
                  {isShowIndex && <td className="px-4 py-2 text-center">{(currentPage - 1) * pageSize + idx + 1}</td>}
                  <td className="px-4 py-2 font-semibold">{vehicel.model || nullValue}</td>
                  <td className="px-4 py-2">{vehicel.model_code || nullValue}</td>
                  <td className="px-4 py-2">{vehicel.order_date ? new Date(vehicel.order_date).toLocaleDateString() : nullValue}</td>
                  <td className="px-4 py-2">{vehicel.dealer_name || nullValue}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block bg-gray-400 text-white rounded-full px-8 py-2 text-lg font-semibold">{vehicel.type || nullValue}</span>
                  </td>
                  <td className="px-4 py-2">{vehicel.purchase_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || nullValue}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button onClick={() => onChangePage && onChangePage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Page {currentPage} of {lastPage}</span>
        <button onClick={() => onChangePage && onChangePage(currentPage + 1)} disabled={currentPage === lastPage} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default VehicleTable; 
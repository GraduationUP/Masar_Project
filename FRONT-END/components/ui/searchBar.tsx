import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    return(
        <div className='bg-white rounded-full flex items-center gap-2 px-4 py-2 text-black outline-none'>
            <SearchIcon/>
            <input type="text" placeholder="ابحث عن متجر، مكان او خدمة..." className="outline-none"/>
        </div>
    )
}

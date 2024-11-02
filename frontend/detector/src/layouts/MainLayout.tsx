import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FadeLoader } from 'react-spinners';
export interface OrderData {
  "Date Ordered": string;
  Month: number;
  "Product Name": string;
  "Product Price": number;
  "Quantity Ordered": number;
  Total: number;
  Week: string;
  Year: number;
}
interface SalesData {
  "Date Ordered": string;
  "Product Name": string;
  "Product Price": number;
  "Quantity Ordered": number;
  Total: number;
}
interface ItemsData {
  "Product": string;
  "Price": number;
}
export interface users{
    "user_id": number;
    "email":string;
    "password":string;
    "username":string;
    "role":string
}
export interface devices{
  "device_id": number;
  "device_name":string;
  "status":string;
  "created_by":string;
  "created_at":string
}
export interface OutletContextType {
  setIsLoading: (loading: boolean) => void;
  setUser:React.Dispatch<React.SetStateAction<users>>
  user:users;
  importData: OrderData[];
  setImportData: React.Dispatch<React.SetStateAction<OrderData[]>>;
  importItemsData: ItemsData[];
  setImportItemsData: React.Dispatch<React.SetStateAction<ItemsData[]>>;
  importSalesData: SalesData[];
  setImportSalesData: React.Dispatch<React.SetStateAction<SalesData[]>>;
}


export const MainLayout = () => {
  const navigate = useNavigate()
  const hostServer = import.meta.env.VITE_SERVER_HOST
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(()=>{
    authCheck()
  },[])
  const authCheck = async () => {
    try {
      setIsLoading(true)
      const res = (await axios.get(`${hostServer}/homeAuthentication`)).data
      console.log(res.authData)
      if(res.authData){
        setUser(res.authData.user[0])
      }else{
        navigate("/login")
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

  } 
  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${hostServer}/logout`)
      if(res.data.success){
        console.log(res.data)
        navigate("/login")
      }
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error)
      throw(error)
    }
  }

  const [importData, setImportData] = useState<OrderData[]>([]); // Initialize as empty
  const [importSalesData, setImportSalesData] = useState<SalesData[]>([])
  const [importItemsData, setImportItemsData] = useState<ItemsData[]>([])
  const [breadCrumb, setBreadCrumb] = useState("Dashboard");

  return (
    <>
      <>

      {isLoading &&
      <>
        <div className="loader z-[101] h-lvh w-lvw fixed flex items-center justify-center opacity-50">
          <FadeLoader color="#2563eb" />
        </div>
      <div className='h-lvh w-lvw z-[100] opacity-50 fixed top-0 bg-neutral-600'></div>
      </>
      }
        {/* ========== MAIN CONTENT ========== */}
        {/* Breadcrumb */}
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center py-2">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width={18} height={18} x={3} y={3} rx={2} />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>
            {/* End Navigation Toggle */}
            {/* Breadcrumb */}
            <ol className="ms-3 flex items-center whitespace-nowrap">
              {/* <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                Application Layout

              </li> */}
              {
                breadCrumb && breadCrumb == "Dashboard"? 
                <>
              <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Dashboard
              </li>
                </>: breadCrumb == "Procurements" ? 
                <>
                             <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Procurements
              </li>
                </>
                :breadCrumb == "Project Tasks" ?
                <>
                                           <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Project Tasks
              </li>
                </> :breadCrumb == "Warehouses" ? 
                <>
                                                    <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Warehouses
              </li>
                </>:breadCrumb == "Suppliers" ?
                <>
                                                                <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Suppliers
              </li>
                </> :breadCrumb == "Projects" ? 
                <>
                                                                                <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Projects
              </li>
                </>:breadCrumb == "Assets" ? 
                <>
                                                                                           <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Assets
              </li>
                </>: 
                <>
                              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                Users
              </li>
                              <li>
                <svg
                  className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                aria-current="page"
              >
                List of accounts
              </li>
                </>
              }

            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Breadcrumb */}
        {/* Sidebar */}
        <div
          id="hs-application-sidebar"
          className="hs-overlay  [--auto-close:lg]
  hs-overlay-open:translate-x-0
  -translate-x-full transition-all duration-300 transform
  w-[260px] h-full
  hidden
  fixed inset-y-0 start-0 z-[60]
  bg-white border-e border-gray-200
  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
  dark:bg-neutral-800 dark:border-neutral-700"
          role="dialog"
          tabIndex={-1}
          aria-label="Sidebar"
        >
          <div className="relative flex flex-col h-full max-h-full">
            <div className="px-6 pt-4">
              {/* Logo */}
              <Link
                className="flex justify-start items-center rounded-xl text-xl font-semibold"
                to="/"
                onClick={()=>{setBreadCrumb("Dashboard")}}
                aria-label="Preline"
              >
                <img src="/logo_logistic.jpeg" alt="Logo" className='object-contain w-20 h-20' />
                <p className='text-md'>Logistics</p>
              </Link>
              {/* End Logo */}
            </div>
            {/* Content */}
            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <nav
                className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                data-hs-accordion-always-open=""
              >
                <ul className="flex flex-col space-y-1">
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/"
                      onClick={()=>{setBreadCrumb("Dashboard")}}
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/procurement"
                      onClick={()=>{setBreadCrumb("Procurements")}}
                    >
                      
                      <svg
                           className="shrink-0 size-4"
                           width={24}
                           height={24}
  fill="#1f2937"
  version="1.2"
  baseProfile="tiny"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 256 188"
  xmlSpace="preserve"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <g>
      {" "}
      <g>
        {" "}
        <g>
          {" "}
          <path d="M63,133c-13,0-23.5,10.5-23.5,23.5s10.5,23.5,23.5,23.5c13,0,23.5-10.5,23.5-23.5S76,133,63,133z M63,165.4 c-4.9,0-9-4.1-9-9c0-4.9,4.1-9,9-9c4.9,0,9,4.1,9,9C72,161.4,68,165.4,63,165.4z M210.8,132c-13,0-23.5,10.5-23.5,23.5 s10.5,23.5,23.5,23.5c13,0,23.5-10.5,23.5-23.5S223.8,132,210.8,132z M210.8,164.4c-4.9,0-9-4.1-9-9c0-4.9,4.1-9,9-9 c4.9,0,9,4.1,9,9C219.8,160.4,215.8,164.4,210.8,164.4z M-0.5,143.1c0,4.6,3.7,8.2,8.2,8.2h22.6c0.9,0,1.7-0.7,1.9-1.5 c2.6-14.7,15.4-24.9,30.8-24.9s28.3,10.2,30.8,24.9c0.2,0.9,0.9,1.5,1.9,1.5H99h30.9V115H-0.5V143.1z M253.6,134.5h-5v-22 c0-7.5-6.1-13.6-13.7-13.6h-24.3c-0.5,0-1-0.3-1.4-0.6l-38-37c-1.7-1.7-4.1-2.7-6.6-2.8h-27.5v92.8h40.9c0.9,0,1.7-0.7,1.9-1.5 c2.6-14.7,15.4-25.9,30.8-25.9s28.3,11.2,30.8,25.9c0.2,0.9,0.9,1.5,1.9,1.5h3.2c4.9,0,8.7-3.9,8.7-8.7v-6.3 C255.5,135.4,254.6,134.5,253.6,134.5z M191.1,99h-41.4c-1,0-1.9-0.9-1.9-1.9V70.7c0-1,0.9-1.9,1.9-1.9h13.9c0.5,0,1,0.3,1.5,0.6 l27.5,26.3C193.5,97,192.7,99,191.1,99z" />{" "}
        </g>{" "}
      </g>{" "}
    </g>{" "}
    <path d="M57.8,101.5H17.1V60.8h15.7v13h9.3v-13h15.7V101.5z M110.9,101.5H70.3V60.8H86v13h9.3v-13h15.7V101.5z M84.7,48.3H44V7.6 h15.7v13H69v-13h15.7V48.3z" />{" "}
  </g>
</svg>
                      Procurements
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/projecttask"
                      onClick={()=>{setBreadCrumb("Project Tasks")}}
                    >

                      <svg
                              className="shrink-0 size-4"
                              width={24}
                                         height={24}
  fill="#1f2937"
  viewBox="0 0 36 36"
  version="1.1"
  preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <title>tasks-line</title>{" "}
    <path
      className="clr-i-outline clr-i-outline-path-1"
      d="M29.29,34H6.71A1.7,1.7,0,0,1,5,32.31V6.69A1.75,1.75,0,0,1,7,5H9V7H7V32H29V7H27V5h2.25A1.7,1.7,0,0,1,31,6.69V32.31A1.7,1.7,0,0,1,29.29,34Z"
    />
    <path
      className="clr-i-outline clr-i-outline-path-2"
      d="M16.66,25.76,11.3,20.4A1,1,0,0,1,12.72,19l3.94,3.94,8.64-8.64a1,1,0,0,1,1.41,1.41Z"
    />
    <path
      className="clr-i-outline clr-i-outline-path-3"
      d="M26,11H10V7.33A2.34,2.34,0,0,1,12.33,5h1.79a4,4,0,0,1,7.75,0h1.79A2.34,2.34,0,0,1,26,7.33ZM12,9H24V7.33A.33.33,0,0,0,23.67,7H20V6a2,2,0,0,0-4,0V7H12.33a.33.33,0,0,0-.33.33Z"
    />{" "}
    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />{" "}
  </g>
</svg>

                      Project Tasks
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/warehouse"
                      onClick={()=>{setBreadCrumb("Warehouses")}}
                    >
<svg

className="shrink-0 size-4"
width={24}
           height={24}
  fill="#1f2937"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 512 512"
  xmlSpace="preserve"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M499.933,163.855L260.501,1.383c-2.716-1.845-6.284-1.844-9.002,0L12.067,163.855c-2.199,1.492-3.516,3.976-3.516,6.634 v333.495c0,4.427,3.589,8.017,8.017,8.017h478.864c4.428,0,8.017-3.589,8.017-8.017V170.489 C503.449,167.831,502.133,165.347,499.933,163.855z M196.676,495.967h-86.58v-86.58h18.171v43.29c0,4.427,3.589,8.017,8.017,8.017 h34.205c4.427,0,8.017-3.589,8.017-8.017v-43.29h18.171V495.967z M92.994,205.228v-18.171h326.013v18.171H92.994z M144.301,444.66 v-35.273h18.171v35.273H144.301z M196.676,393.353h-26.188h-34.205h-26.188v-86.58h18.171v43.29c0,4.427,3.589,8.017,8.017,8.017 h34.205c4.427,0,8.017-3.589,8.017-8.017v-43.29h18.171V393.353z M144.301,342.046v-35.273h18.171v35.273H144.301z M299.29,495.967h-86.58v-86.58h18.171v43.29c0,4.427,3.589,8.017,8.017,8.017h34.205c4.428,0,8.017-3.589,8.017-8.017v-43.29 h18.171V495.967z M246.914,444.66v-35.273h18.171v35.273H246.914z M487.416,495.967h-69.478V324.409 c0-4.427-3.588-8.017-8.017-8.017c-4.428,0-8.017,3.589-8.017,8.017v171.557h-86.58V401.37c0-4.427-3.588-8.017-8.017-8.017 H212.71v-94.597c0-4.427-3.589-8.017-8.017-8.017h-94.597v-69.478h291.808v68.944c0,4.427,3.588,8.017,8.017,8.017 c4.428,0,8.017-3.589,8.017-8.017v-68.944h9.086c4.428,0,8.017-3.589,8.017-8.017V179.04c0-4.427-3.588-8.017-8.017-8.017H84.977 c-4.427,0-8.017,3.589-8.017,8.017v34.205c0,4.427,3.589,8.017,8.017,8.017h9.086v274.706H24.585V174.737L256,17.705 l231.415,157.032V495.967z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M290.205,68.409h-68.409c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h68.409 c4.428,0,8.017-3.589,8.017-8.017S294.633,68.409,290.205,68.409z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M290.205,102.614h-68.409c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h68.409 c4.428,0,8.017-3.589,8.017-8.017S294.633,102.614,290.205,102.614z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M290.205,136.818h-68.409c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h68.409 c4.428,0,8.017-3.589,8.017-8.017S294.633,136.818,290.205,136.818z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M170.489,367.7h-34.205c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h34.205 c4.427,0,8.017-3.589,8.017-8.017C178.505,371.289,174.916,367.7,170.489,367.7z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M170.489,470.313h-34.205c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h34.205 c4.427,0,8.017-3.589,8.017-8.017C178.505,473.903,174.916,470.313,170.489,470.313z" />{" "}
      </g>{" "}
    </g>{" "}
    <g>
      {" "}
      <g>
        {" "}
        <path d="M273.102,470.313h-34.205c-4.427,0-8.017,3.589-8.017,8.017c0,4.427,3.589,8.017,8.017,8.017h34.205 c4.428,0,8.017-3.589,8.017-8.017C281.119,473.903,277.531,470.313,273.102,470.313z" />{" "}
      </g>{" "}
    </g>{" "}
  </g>
</svg>

                      Warehouses
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/supplier"
                      onClick={()=>{setBreadCrumb("Suppliers")}}
                    >
<svg fill="#1f2937" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"            className="shrink-0 size-4"
             width={24}
                        height={24}>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    <path d="M20.929,1.629A1,1,0,0,0,20,1H4a1,1,0,0,0-.929.629C1.04,6.778,1.022,6.589,1.008,6.961,1.007,6.975,1,6.986,1,7V22a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V7C23,6.539,22.5,5.7,20.929,1.629ZM4.677,3H19.323l1.2,3H3.477ZM21,21H3V8H21ZM11,15.5H9v-2h2v-2h2v2h2v2H13v2H11Z" />
  </g>
</svg>

                      Suppliers
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/project"
                      onClick={()=>{setBreadCrumb("Projects")}}
                    >
<svg
           className="shrink-0 size-4"
           width={24}
                      height={24}
  viewBox="0 0 24.00 24.00"
  xmlns="http://www.w3.org/2000/svg"
  fill="#1f2937"
  stroke="#1f2937"
  strokeWidth="0.00024000000000000003"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    <path d="M17 5V3H7v2H1v16h22V5zM8 4h8v1H8zm14 16H2V10h20zm0-11H2V6h20z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </g>
</svg>

                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      to="/assets"
                      onClick={()=>{setBreadCrumb("Assets")}}
                    >
 <svg
  fill="#1f2937"
  version="1.1"
  id="Layer_1"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 32 32"
  xmlSpace="preserve"
  className="shrink-0 size-4"
  width={24}
             height={24}
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      id="protect--critical--assets_1_"
      d="M17,28.36H1c-0.199,0-0.36-0.161-0.36-0.36V7c0-0.096,0.038-0.187,0.105-0.254l6-6 C6.813,0.678,6.904,0.64,7,0.64h15c0.199,0,0.36,0.161,0.36,0.36v12h-0.72V1.36H7.36V7c0,0.199-0.161,0.36-0.36,0.36H1.36v20.28H17 V28.36z M1.869,6.64H6.64V1.869L1.869,6.64z M16.5,22.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,21.64,4,21.64h12.5 c0.199,0,0.36,0.161,0.36,0.36S16.699,22.36,16.5,22.36z M16.5,19.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,18.64,4,18.64h12.5 c0.199,0,0.36,0.161,0.36,0.36S16.699,19.36,16.5,19.36z M16.5,16.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,15.64,4,15.64h12.5 c0.199,0,0.36,0.161,0.36,0.36S16.699,16.36,16.5,16.36z M19,13.36H4c-0.199,0-0.36-0.161-0.36-0.36S3.801,12.64,4,12.64h15 c0.199,0,0.36,0.161,0.36,0.36S19.199,13.36,19,13.36z M25,31.36c-3.507,0-6.36-2.854-6.36-6.36v-7.223l6.36-3.18l6.36,3.18V25 C31.36,28.507,28.507,31.36,25,31.36z M19.36,18.223V25c0,3.11,2.529,5.64,5.64,5.64s5.64-2.529,5.64-5.64v-6.777L25,15.402 L19.36,18.223z"
    />{" "}
    <rect
      id="_Transparent_Rectangle"
      style={{ fill: "none" }}
      width={32}
      height={32}
    />{" "}
  </g>
</svg>

                      Assets
                    </Link>
                  </li>

  
                  <li className="hs-accordion" id="account-accordion">
                    <button
                      type="button"
                      className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
                      aria-expanded="true"
                      aria-controls="account-accordion-child"
                    >

                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5 size-4" width={24} height={24}>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
  <g id="SVGRepo_iconCarrier">
    {" "}
    <path
      d="M10.1992 12C12.9606 12 15.1992 9.76142 15.1992 7C15.1992 4.23858 12.9606 2 10.1992 2C7.43779 2 5.19922 4.23858 5.19922 7C5.19922 9.76142 7.43779 12 10.1992 12Z"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M1 22C1.57038 20.0332 2.74795 18.2971 4.36438 17.0399C5.98081 15.7827 7.95335 15.0687 10 15C14.12 15 17.63 17.91 19 22"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M17.8205 4.44006C18.5822 4.83059 19.1986 5.45518 19.579 6.22205C19.9594 6.98891 20.0838 7.85753 19.9338 8.70032C19.7838 9.5431 19.3674 10.3155 18.7458 10.9041C18.1243 11.4926 17.3302 11.8662 16.4805 11.97"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M17.3203 14.5701C18.6543 14.91 19.8779 15.5883 20.8729 16.5396C21.868 17.4908 22.6007 18.6827 23.0003 20"
      stroke="#1f2937"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
  </g>
</svg>


                      Users
                      <svg
                        className="hs-accordion-active:block ms-auto hidden size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                      <svg
                        className="hs-accordion-active:hidden ms-auto block size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <div
                      id="account-accordion-child"
                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                      role="region"
                      aria-labelledby="account-accordion"
                    >
                      <ul className="ps-8 pt-1 space-y-1">
                        <li>
                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="users/view"
                            onClick={()=>{setBreadCrumb("Items")}}
                          >
                            {/* <svg
                              fill="#1f2937"
                              height="15"
                              width="15"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 512 512"
                              xmlSpace="preserve"
                              stroke="#1f2937"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M226.133,469.333H55.467V409.6c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v68.267 c0,4.71,3.823,8.533,8.533,8.533h179.2c4.71,0,8.533-3.823,8.533-8.533S230.844,469.333,226.133,469.333z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M46.933,366.933c-4.71,0-8.533,3.823-8.533,8.533S42.223,384,46.933,384h0.085c4.71,0,8.491-3.823,8.491-8.533 S51.644,366.933,46.933,366.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M394.3,139.034L257.766,2.5c-1.596-1.604-3.772-2.5-6.033-2.5h-204.8C42.223,0,38.4,3.823,38.4,8.533v332.8 c0,4.71,3.823,8.533,8.533,8.533c4.71,0,8.533-3.823,8.533-8.533V17.067H243.2v128c0,4.71,3.823,8.533,8.533,8.533h128v76.8 c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-85.333C396.8,142.805,395.904,140.629,394.3,139.034z M260.267,136.533 V29.133l107.401,107.401H260.267z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M345.6,256c-70.579,0-128,57.421-128,128s57.421,128,128,128s128-57.421,128-128S416.179,256,345.6,256z M345.6,494.933 c-61.167,0-110.933-49.766-110.933-110.933S284.433,273.067,345.6,273.067S456.533,322.833,456.533,384 S406.767,494.933,345.6,494.933z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                                <g>
                                  {" "}
                                  <g>
                                    {" "}
                                    <path d="M429.286,378.957c-22.272-31.138-51.994-48.29-83.686-48.29s-61.406,17.143-83.678,48.29 c-2.005,2.807-2.125,6.682-0.324,9.626c21.709,35.319,51.132,54.904,82.859,55.151c0.205,0,0.41,0,0.614,0 c31.872,0,61.841-19.524,84.454-55.04C431.411,385.741,431.317,381.798,429.286,378.957z M345.6,349.867 c9.395,0,17.032,7.637,17.032,17.033c0,9.395-7.637,17.033-17.032,17.033c-9.395,0-17.033-7.646-17.033-17.033 S336.205,349.867,345.6,349.867z M410.01,387.081c-18.526,25.626-41.327,39.586-64.947,39.586c-0.162,0-0.316,0-0.469,0 c-23.424-0.188-45.747-14.148-63.556-39.543c-1.109-1.587-1.033-3.84,0.205-5.333c8.678-10.513,18.398-18.662,28.732-24.38 c1.271-0.7,2.825,0.495,2.483,1.911c-1.988,8.09-1.237,17.212,6.016,27.341c3.866,5.402,9.054,9.668,15.275,12.006 c23.748,8.917,45.986-9.088,45.986-31.735c0-3.115-0.768-5.291-1.348-7.893c-0.307-1.374,1.289-2.483,2.526-1.809 c10.411,5.7,20.19,13.858,28.937,24.422C411.102,383.181,411.17,385.476,410.01,387.081z" />{" "}
                                  </g>{" "}
                                </g>{" "}
                              </g>
                            </svg> */}
                            List of accounts 
                          </Link>
                          <Link    className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                          
                            onClick={()=>{setBreadCrumb("Items")}}to="/users/edit">
                          Edit accounts
                          </Link>
                        </li>
                        {/* <li>


                          <Link
                            className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200"
                            to="items/create"
                          >
                            <svg
                              height={15}
                              width={15}
                              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                                <path
                                  d="M17 15V18M17 21V18M17 18H14M17 18H20"
                                  stroke="#1f2937"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />{" "}
                              </g>
                            </svg>
                            Create
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white"
                      href="#"
                      onClick={handleLogout}
                    >

                      <svg
                        fill="#B91c1c"
                        viewBox="0 0 32 32"
                        version="1.1"
                        className="shrink-0 mt-0.5 size-4" width={24} height={24}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z" />{" "}
                        </g>
                      </svg>


                      <span className='text-red-700'>
                        Logout</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {/* End Content */}
          </div>
        </div>
        {/* End Sidebar */}
        {/* Content */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:ps-[16rem] lg:pt-0 lg:pr-0">
          <Outlet context={{setIsLoading,user, importData, setImportData, importItemsData, setImportItemsData, importSalesData, setImportSalesData }} />
        </div>
        {/* End Content */}
        {/* ========== END MAIN CONTENT ========== */}
      </>

    </>
  )

}
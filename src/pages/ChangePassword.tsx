import USFflag from "../assets/USFlag.png"
import { IoChevronDown } from "react-icons/io5";
import { LuLock } from "react-icons/lu";
import SideTheme from "../components/SideTheme";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setBlur, setFocus } from "../features/FormAuth/formAuthSlice";
import { useState } from "react";
// import { FiUser } from "react-icons/fi";
import { toast } from 'react-toastify';
// import { IoCode } from "react-icons/io5";
import Cookies from 'js-cookie';
import axios from "../api/axios";
import { HiOutlineMail } from "react-icons/hi";
import md5 from 'crypto-js/md5';


export default function ChangePassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInputFocus = (inputName: string) => {
        dispatch(setFocus(inputName))
    };
    const focusedInput: string = useSelector((state: RootState) => state.forms.focusedInput);
    // const showPassword: boolean = useSelector((state: RootState) => state.forms.showPassword);
    // const handleTogglePassword = () => {
    //     dispatch(togglePassword())
    // };

    const [email, setEmail] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [accessTokenFood, setAccessTokenFood] = useState<string | undefined>(
        Cookies.get("accessToken-bach")
    );
    console.log(setAccessTokenFood);

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const hashedPassword = md5(oldPassword).toString();

        await axios.put("/api/v1/auth/change-password", {
            email, oldPassword: hashedPassword, newPassword, confirmPassword
        },
            {
                headers: {
                    Authorization: `bearer ${accessTokenFood}`,
                },
            }
        )
            .then((res) => {
                console.log("res change pass", res);
                toast("Login Successful")
                return navigate("/")
            })
            .catch(err => {
                toast.error(<p className=" capitalize">{err.response.data.message}</p>)
            })
    }
    return <div className="max-h-[1024px] flex ">
        <div className="flex-1 relative bg-white dark:bg-[#292C38]">
            <div className="ml-[1.875rem] md:ml-[1.875rem] mt-10  xl:ml-[4.25rem] max-w-[193px] bg-secondary dark:bg-[#343744] flex items-center justify-center rounded-xl px-4 py-3">
                <div className=" h-[1.125rem] w-6">
                    <img src={USFflag} className="h-full w-full object-cover" alt="" />
                </div>
                <span className="text-base font-bold text-textMain  px-2">English (US)</span>
                <IoChevronDown style={{ width: 24, height: 24, color: "#96A0B5" }} />
            </div>
            <div className="  mt-[3.313em] ml-[1.875rem] sm:pr-[1.875rem] md:pr-0 lg:pr-0 md:ml-[3.125rem] lg:ml-28 xl:ml-[10.313rem]">
                <div className="mx-auto lg:mx-0 h-10 w-[12.313rem] flex items-center gap-4 ">
                    <div className="flex">
                        <div className="rectangle"></div>
                        <div className="leftCircle"></div></div>
                    <span className="text-[1.75rem] leading-6 text-[#062046] dark:text-white font-bold">Insight CO</span>
                </div>
                <form onSubmit={handleSubmit} className="mx-auto md:mx-0  max-w-[400px] md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] mt-12 flex flex-col gap-8">
                    <div className=" flex flex-col gap-3">
                        <div className=" font-bold text-2xl leading-9 text-[#292C38] dark:text-white">Change Your Password</div>
                        {/* <div className="text-sm font-medium text-textsecondary dark:text-textMain">Log In to your account</div> */}
                    </div>
                    <div className="flex flex-col gap-4">
                        <span onFocus={() => handleInputFocus("email")}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'email' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <HiOutlineMail style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email" className="stylePlaceholder flex-1 mr-[2.688rem] outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38] " />
                        </span>
                        <span onFocus={() => handleInputFocus('oldPassword')}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'oldPassword' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={oldPassword} onChange={e => setOldPassword(e.target.value)} type="text" required placeholder="Old Password" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />
                        </span>
                        <span onFocus={() => handleInputFocus('newPassword')}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'newPassword' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" required placeholder="New Password" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />
                            {/* {showPassword ? <LuEye onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} /> :
                                <LuEyeOff onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} />} */}
                        </span>

                        <span onFocus={() => handleInputFocus('confirmPassword')}
                            onBlur={() => dispatch(setBlur())}
                            className={`${focusedInput === 'confirmPassword' ? ' border-third' : 'border-borderColor dark:border-[#565C70]'} h-58 flex items-center pt-[1.188rem] pb-[1.125rem] rounded-xl border  `}>
                            <LuLock style={{ height: 24, width: 24, marginLeft: 16, marginRight: 12, color: "#96A0B5" }} />
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="text" required placeholder="Confirm Password" className="password stylePlaceholder flex-1 outline-none text-base leading-nomalText font-medium tracking-nomalText  text-textInput dark:text-white bg-white dark:bg-[#292C38]" />
                            {/* {showPassword ? <LuEye onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} /> :
                                <LuEyeOff onClick={handleTogglePassword} style={{ height: 24, width: 24, color: "#96A0B5", margin: " 0 16px" }} />} */}
                        </span>



                    </div>
                    <div className="flex items-center justify-between custom-checkbox">
                        <label className="main text-textsecondary dark:text-textMain font-medium text-base leading-nomalText">Remember Me
                            <input type="checkbox" />
                            <span className="checkbox-container  bg-white dark:bg-transparent   dark:border-[#565C70]"></span>
                        </label>
                    </div>
                    <button type="submit" className="h-58  bg-third text-base leading-nomalText tracking-nomalText font-medium rounded-xl text-white ">Confirm</button>
                </form>
                <div className=" md:max-w-[400px] lg:max-w-[28.125rem] xl:max-w-[33.75rem] pt-[8.313rem] pb-12 flex justify-center">
                    <span className="font-medium text-base leading-normalText tracking-normalText text-textsecondary dark:text-[#94A3B8]">Don't have an account?</span>&nbsp;
                    <span className="text-third font-bold text-base"> <Link to="/register">Sign Up</Link></span>
                </div>

            </div>
        </div>
        <SideTheme />
    </div >;
}

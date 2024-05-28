'use client'

import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import LoginModal from "./login_modal";
import classNames from 'classnames'
import useAuthStore from '@/scripts/auth_store'
import { KakaoLogout, NativeLogout } from '@/scripts/api/logout'

export default function Navbar() {
  const currentPath = usePathname();
  const navigation = [
    { name: '대시보드', href: '/', current: currentPath == "/" ? true : false },
    { name: '팀 소개', href: './about', current: currentPath == "/about" ? true : false }
  ]

  const { isLoggedIn, logout, id, provider } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();
  const handleLogin = async function () {
    let result = null;
    switch (provider) {
      // 토큰을 직접 다루므로 보안 정책 검토 필요
      case "kakao":
        result = await KakaoLogout(window.localStorage.kakaoToken as string);
        break;
      case "google":
        break;
      case "native":
        result = await NativeLogout(id as string);
        break;
      default:
        break;
    }
    if (!result) {
      console.error("Logout Error");
    }
    logout();
    router.push('/');
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="/images/service_logo.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserCircleIcon className='h-8 w-8 text-gray-400 hover:text-white' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => setIsLoginOpen(true)}
                            className={classNames(isLoggedIn ? 'hidden' : '', active ? 'bg-gray-100' : '', 'text-left block px-4 py-2 text-sm text-gray-700 w-full')}
                          >
                            로그인
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a href="#">
                            <button
                              className={classNames(!isLoggedIn ? 'hidden' : '', active ? 'bg-gray-100' : '', 'text-left block px-4 py-2 text-sm text-gray-700 w-full')}
                            >
                              마이페이지
                            </button>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogin}
                            className={classNames(!isLoggedIn ? 'hidden' : '', active ? 'bg-gray-100' : '', 'text-left block px-4 py-2 text-sm text-gray-700 w-full')}
                          >
                            로그아웃
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
          <LoginModal open={isLoginOpen} setOpen={setIsLoginOpen} />
        </>
      )}

    </Disclosure>
  )
}
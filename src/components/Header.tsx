import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const navigation = [
  { name: "Guides", href: "#", current: true },
  { name: "Your Vaults", href: "/vault", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto container">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                  <Link href="/">
                    <img
                      className="h-8 w-auto"
                      src="/assets/Logo.svg"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? "" : "",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ConnectButton chainStatus="icon" accountStatus="address" />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex outline rounded-full bg-white text-sm px-3 py-1">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Select Language</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>EN </div>
                        <div>
                          <IconGlobe />
                        </div>
                      </div>
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
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            EN
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            FR
                          </div>
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
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

const IconGlobe = () => {
  return (
    <>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.0001 21.2034C9.60558 21.2034 8.28801 20.9349 7.04742 20.398C5.80684 19.861 4.72342 19.1294 3.79715 18.2031C2.87088 17.2769 2.13927 16.1935 1.60232 14.9529C1.06536 13.7123 0.796875 12.3947 0.796875 11.0001C0.796875 9.5929 1.06536 8.27216 1.60232 7.03792C2.13927 5.80367 2.87088 4.72342 3.79715 3.79715C4.72342 2.87088 5.80684 2.13927 7.04742 1.60232C8.28801 1.06536 9.60558 0.796875 11.0001 0.796875C12.4074 0.796875 13.7281 1.06536 14.9624 1.60232C16.1966 2.13927 17.2769 2.87088 18.2031 3.79715C19.1294 4.72342 19.861 5.80367 20.398 7.03792C20.9349 8.27216 21.2034 9.5929 21.2034 11.0001C21.2034 12.3947 20.9349 13.7123 20.398 14.9529C19.861 16.1935 19.1294 17.2769 18.2031 18.2031C17.2769 19.1294 16.1966 19.861 14.9624 20.398C13.7281 20.9349 12.4074 21.2034 11.0001 21.2034ZM10.9882 18.8844C11.4056 18.2924 11.7726 17.6723 12.0893 17.0243C12.4059 16.3763 12.6643 15.6896 12.8643 14.9643H9.13005C9.33005 15.6896 9.58539 16.3763 9.89608 17.0243C10.2068 17.6723 10.5708 18.2924 10.9882 18.8844ZM8.41808 18.4844C8.11011 17.9424 7.84761 17.3755 7.63058 16.7839C7.41356 16.1922 7.23005 15.5857 7.08005 14.9643H4.1659C4.63728 15.7896 5.23248 16.5087 5.9515 17.1214C6.67053 17.734 7.49273 18.1884 8.41808 18.4844ZM13.5643 18.4844C14.4896 18.1884 15.3138 17.734 16.0368 17.1214C16.7598 16.5087 17.357 15.7896 17.8284 14.9643H14.9143C14.7643 15.5857 14.5788 16.1922 14.3577 16.7839C14.1367 17.3755 13.8722 17.9424 13.5643 18.4844ZM3.3219 12.9822H6.68005C6.63005 12.6489 6.59255 12.3217 6.56755 12.0007C6.54255 11.6797 6.53005 11.3462 6.53005 11.0001C6.53005 10.6501 6.54255 10.3156 6.56755 9.99662C6.59255 9.67759 6.63005 9.35141 6.68005 9.01807H3.3219C3.23857 9.34742 3.17607 9.67261 3.1344 9.99362C3.09273 10.3146 3.0719 10.6501 3.0719 11.0001C3.0719 11.3462 3.09273 11.6807 3.1344 12.0037C3.17607 12.3267 3.23857 12.6529 3.3219 12.9822ZM8.68005 12.9822H13.3143C13.3643 12.6489 13.3998 12.3217 13.4208 12.0007C13.4418 11.6797 13.4523 11.3462 13.4523 11.0001C13.4523 10.6501 13.4418 10.3156 13.4208 9.99662C13.3998 9.67759 13.3643 9.35141 13.3143 9.01807H8.68005C8.63005 9.35141 8.59255 9.67759 8.56755 9.99662C8.54255 10.3156 8.53005 10.6501 8.53005 11.0001C8.53005 11.3462 8.54255 11.6797 8.56755 12.0007C8.59255 12.3217 8.63005 12.6489 8.68005 12.9822ZM15.3143 12.9822H18.6664C18.7498 12.6529 18.8123 12.3267 18.8539 12.0037C18.8956 11.6807 18.9164 11.3462 18.9164 11.0001C18.9164 10.6501 18.8956 10.3146 18.8539 9.99362C18.8123 9.67261 18.7498 9.34742 18.6664 9.01807H15.3143C15.3603 9.35141 15.3948 9.67759 15.4178 9.99662C15.4408 10.3156 15.4523 10.6501 15.4523 11.0001C15.4523 11.3462 15.4408 11.6797 15.4178 12.0007C15.3948 12.3217 15.3603 12.6489 15.3143 12.9822ZM14.9143 7.03005H17.8284C17.357 6.20468 16.7598 5.48666 16.0368 4.87598C15.3138 4.26528 14.4896 3.81192 13.5643 3.5159C13.8722 4.05793 14.1367 4.62379 14.3577 5.21348C14.5788 5.80314 14.7643 6.40867 14.9143 7.03005ZM9.13005 7.03005H12.8643C12.6683 6.30468 12.4119 5.61899 12.0953 4.97298C11.7786 4.32696 11.4096 3.70793 10.9882 3.1159C10.5708 3.70793 10.2068 4.32696 9.89608 4.97298C9.58539 5.61899 9.33005 6.30468 9.13005 7.03005ZM4.1659 7.03005H7.08005C7.23005 6.40867 7.41356 5.80314 7.63058 5.21348C7.84761 4.62379 8.11011 4.05793 8.41808 3.5159C7.49273 3.81192 6.67053 4.26528 5.9515 4.87598C5.23248 5.48666 4.63728 6.20468 4.1659 7.03005Z"
          fill="#161616"
        />
      </svg>
    </>
  );
};

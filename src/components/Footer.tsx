export const Footer = () => {
  return (
    <footer className="inset-x-0 bottom-0 bg-[#2B393B] p-4 mx-4 mb-4 rounded-2xl mt-6">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-white">Qwerty V1</p>
        </div>
        <nav className="text-white">
          <ul className="flex space-x-4">
            <li>
              <a className="hover:underline" href="#">
                Discord
              </a>
            </li>
            <li>·</li>
            <li>
              <a className="hover:underline" href="#">
                GitHub
              </a>
            </li>
            <li>·</li>
            <li>
              <a className="hover:underline" href="#">
                GitBook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

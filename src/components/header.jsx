const Header = ({ logo, menu }) => {
  return (
    <header className="flex grid w-full grid-cols-2 justify-center gap-4 border-b border-solid border-slate-200 bg-white px-8 py-3 leading-[normal] md:grid-cols-[1fr_auto_1fr]">
      <div className="my-1 max-h-8 md:my-3">{logo}</div>
      <div className="w-full md:content-center md:px-6 md:py-2">{menu}</div>
    </header>
  );
};

export default Header;

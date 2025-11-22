import svgPaths from "./svg-elokzeavx4";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

function ImageWithFallback() {
  return (
    <div className="h-[202px] relative shrink-0 w-[326px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[202px] w-[326px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#00d9a3] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <ImageWithFallback />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-[114.052px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[114.052px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] tracking-[1px] whitespace-pre">{`Stalk Master `}</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[48px] relative shrink-0 w-[174.052px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[48px] items-center relative w-[174.052px]">
        <Container />
        <Heading />
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[24px] left-0 top-[3px] w-[77.115px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute h-[24px] left-[109.11px] top-[3px] w-[78.063px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Operations</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute h-[24px] left-[219.18px] top-[3px] w-[61.979px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Products</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="absolute h-[24px] left-[313.16px] top-[3px] w-[79.031px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Warehouse</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[30px] left-[424.19px] top-0 w-[94.281px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#00d9a3] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Move History</p>
    </div>
  );
}

function Link5() {
  return (
    <div className="absolute h-[24px] left-[550.47px] top-[3px] w-[56.854px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Settings</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[30px] relative shrink-0 w-[607.323px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-[607.323px]">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="bg-[#1e3338] h-[80.667px] relative shrink-0 w-full" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[80.667px] items-start pb-[0.667px] pt-[16px] px-[24px] relative w-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[26px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3338] h-[44px] relative rounded-[10px] shrink-0 w-[115.01px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00d9a3] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[115.01px]">
        <Icon />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[72px] text-[#00d9a3] text-[16px] text-center text-nowrap top-[8.33px] translate-x-[-50%] whitespace-pre">NEW</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[176.781px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[176.781px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">Move History</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[44px] relative shrink-0 w-[307.792px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[44px] items-center relative w-[307.792px]">
        <Button />
        <Heading1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.83%_87.46%_79.17%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[12.5%] right-[87.46%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[79.17%_87.46%_20.83%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
            <path d="M0.833333 0.833333H0.841667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[20.83%_12.5%_79.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 2">
            <path d="M0.833333 0.833333H11.6667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[33.33%] right-[12.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 2">
            <path d="M0.833333 0.833333H11.6667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[79.17%_12.5%_20.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 2">
            <path d="M0.833333 0.833333H11.6667" id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#00d9a3] h-[37.333px] relative rounded-[10px] shrink-0 w-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[37.333px] items-start pb-0 pt-[8.667px] px-[8px] relative w-[36px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.pf3beb80} id="Vector" stroke="var(--stroke-0, #B4CDD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 2">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #B4CDD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_12.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 2">
            <path d="M0.833333 0.833333H15.8333" id="Vector" stroke="var(--stroke-0, #B4CDD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_62.5%_12.5%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 17">
            <path d="M0.833333 0.833333V15.8333" id="Vector" stroke="var(--stroke-0, #B4CDD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_37.5%_12.5%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 17">
            <path d="M0.833333 0.833333V15.8333" id="Vector" stroke="var(--stroke-0, #B4CDD4)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[#1e3338] grow h-[37.333px] min-h-px min-w-px relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[37.333px] items-start pb-[0.667px] pt-[8.667px] px-[8.667px] relative w-full">
          <Icon2 />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[37.333px] items-start left-[272px] top-[2px] w-[81.333px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#1e3338] h-[41.333px] left-0 rounded-[10px] top-0 w-[256px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[41.333px] items-center overflow-clip pl-[40px] pr-[16px] py-[8px] relative rounded-[inherit] w-[256px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Search movements...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[10.67px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8833 13.8833" id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[41.333px] left-0 top-0 w-[256px]" data-name="Container">
      <TextInput />
      <Icon3 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[41.333px] relative shrink-0 w-[353.333px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[41.333px] relative w-[353.333px]">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container7 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[56.333px] left-0 top-0 w-[176.719px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Reference</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[56.333px] left-[176.72px] top-0 w-[120.844px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Date</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[56.333px] left-[297.56px] top-0 w-[107.271px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Contact</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[56.333px] left-[404.83px] top-0 w-[127.292px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">From</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[56.333px] left-[532.13px] top-0 w-[127.292px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">To</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[56.333px] left-[659.42px] top-0 w-[115.094px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Product</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute h-[56.333px] left-[774.51px] top-0 w-[113.719px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Quantity</p>
    </div>
  );
}

function HeaderCell7() {
  return (
    <div className="absolute h-[56.333px] left-[888.23px] top-0 w-[149.927px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[14.33px] whitespace-pre">Status</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[56.333px] left-0 top-0 w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
      <HeaderCell7 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[56.333px] left-0 top-0 w-[1038.16px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[113.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">WH/IN/0001</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[80.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[26.67px] whitespace-pre">12/1/2001</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[80.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[52px]">Azure Interior</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[80.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[80.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">WH/Stock1</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[80.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-white top-[14.67px] w-[42px]">Office Chair</p>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[80.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">50</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[66.781px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">Ready</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[80.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[113.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">WH/IN/0001</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[80.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[26.67px] whitespace-pre">12/1/2001</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[80.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[52px]">Azure Interior</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[80.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[80.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">WH/Stock1</p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[80.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-white top-[14.67px] w-[39px]">Desk Lamp</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[80.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">100</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[66.781px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">Ready</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[80.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[80.667px] left-0 top-[80.67px] w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[128.719px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">WH/OUT/0002</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[80.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[26.67px] whitespace-pre">12/1/2001</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[80.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[52px]">Azure Interior</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[80.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">WH/Stock1</p>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[80.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[80.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-white top-[14.67px] w-[58px]">Monitor Stand</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[80.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">25</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[66.781px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">Ready</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[80.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[80.667px] left-0 top-[161.33px] w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[128.719px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">WH/OUT/0002</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[80.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[26.67px] whitespace-pre">12/1/2001</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[80.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[52px]">Azure Interior</p>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[80.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">WH/Stock2</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[80.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[80.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">Keyboard</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[80.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">30</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[66.781px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">Ready</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[80.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[80.667px] left-0 top-[242px] w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[37.67px] w-[113.5px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">WH/IN/0003</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[104.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[104.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[38.67px] whitespace-pre">12/2/2001</p>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[104.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[60px]">Tech Supplies Co</p>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="absolute h-[104.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[38.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell36() {
  return (
    <div className="absolute h-[104.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[38.67px] whitespace-pre">WH/Stock1</p>
    </div>
  );
}

function TableCell37() {
  return (
    <div className="absolute h-[104.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[38.67px] whitespace-pre">Mouse</p>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="absolute h-[104.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[38.67px] whitespace-pre">75</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[rgba(255,165,0,0.1)] h-[53.333px] left-[24px] rounded-[10px] top-[25.67px] w-[72.833px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[orange] top-px w-[61px]">In Progress</p>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="absolute h-[104.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[104.667px] left-0 top-[322.67px] w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[rgba(248,113,113,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[128.719px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-red-400 whitespace-pre">WH/OUT/0004</p>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[176.719px]" data-name="Table Cell">
      <Text10 />
    </div>
  );
}

function TableCell41() {
  return (
    <div className="absolute h-[80.667px] left-[176.72px] top-0 w-[120.844px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#b4cdd4] text-[16px] text-nowrap top-[26.67px] whitespace-pre">12/2/2001</p>
    </div>
  );
}

function TableCell42() {
  return (
    <div className="absolute h-[80.667px] left-[297.56px] top-0 w-[107.271px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.67px] w-[44px]">Office Depot</p>
    </div>
  );
}

function TableCell43() {
  return (
    <div className="absolute h-[80.667px] left-[404.83px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">WH/Stock1</p>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="absolute h-[80.667px] left-[532.13px] top-0 w-[127.292px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">vendor</p>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="absolute h-[80.667px] left-[659.42px] top-0 w-[115.094px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-white top-[14.67px] w-[40px]">USB Cable</p>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="absolute h-[80.667px] left-[774.51px] top-0 w-[113.719px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[24px] text-[16px] text-nowrap text-white top-[26.67px] whitespace-pre">200</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[25.67px] w-[101.927px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">Completed</p>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="absolute h-[80.667px] left-[888.23px] top-0 w-[149.927px]" data-name="Table Cell">
      <Text11 />
    </div>
  );
}

function TableRow6() {
  return (
    <div className="absolute h-[80.667px] left-0 top-[427.33px] w-[1038.16px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell40 />
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
      <TableCell47 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[508px] left-0 top-[56.33px] w-[1038.16px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
      <TableRow6 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[564.667px] relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container9() {
  return (
    <div className="box-border content-stretch flex flex-col h-[580px] items-start overflow-clip pl-0 py-0 relative shrink-0 w-full" data-name="Container">
      <Table />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-[#1e3338] h-[581.333px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col h-[581.333px] items-start p-[0.667px] relative w-full">
          <Container9 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Movements</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">6</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_1] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Inbound</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-green-400 text-nowrap top-[-3px] whitespace-pre">3</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:1_/_2] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph2 />
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Outbound</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-red-400 top-[-3px] whitespace-pre">3</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:1_/_3] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph4 />
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ready</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">4</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="[grid-area:1_/_4] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph6 />
          <Paragraph7 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[117.333px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[870.667px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[870.667px] items-start pb-0 pt-[32px] px-[24px] relative w-full">
          <Container8 />
          <Container10 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function MoveHistory() {
  return (
    <div className="bg-[#2c4b52] content-stretch flex flex-col h-[951.333px] items-start relative shrink-0 w-full" data-name="MoveHistory">
      <Navigation />
      <Container16 />
    </div>
  );
}

export default function MoveHistoryPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Move History Page">
      <MoveHistory />
    </div>
  );
}
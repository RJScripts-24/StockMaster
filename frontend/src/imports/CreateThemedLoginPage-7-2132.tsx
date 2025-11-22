import svgPaths from "./svg-njq8r7xmn9";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

function ImageWithFallback() {
  return (
    <div className="h-[262px] relative shrink-0 w-[112px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[262px] w-[112px]" />
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
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] tracking-[1px] whitespace-pre">{`StockMaster `}</p>
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
    <div className="absolute h-[30px] left-[313.16px] top-0 w-[79.031px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#00d9a3] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Warehouse</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[24px] left-[424.19px] top-[3px] w-[94.281px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Move History</p>
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

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">Warehouse</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Manage warehouse details and locations</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[68px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d="M5 12H19" id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 5V19" id="Vector_2" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#2c4b52] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[186.083px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[186.083px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] whitespace-pre">Add New Warehouse</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Heading2 />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Name:</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#2c4b52] h-[49.333px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[49.333px] items-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter warehouse name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[81.333px] items-start left-0 top-0 w-[782.667px]" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Short Code:</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-[#2c4b52] h-[49.333px] relative rounded-[10px] shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[49.333px] items-center px-[16px] py-[12px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">e.g., WH-001</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[81.333px] items-start left-0 top-[101.33px] w-[782.667px]" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Address:</p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="bg-[#2c4b52] h-[97.333px] relative rounded-[10px] shrink-0 w-full" data-name="Text Area">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[97.333px] items-start px-[16px] py-[12px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter complete address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[134.667px] items-start left-0 top-[202.67px] w-[782.667px]" data-name="Container">
      <Label2 />
      <TextArea />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[319.28px] size-[20px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p38f8300} id="Vector" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pf973700} id="Vector_2" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14392758} id="Vector_3" stroke="var(--stroke-0, #1E3338)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#00d9a3] h-[48px] left-0 rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[357.33px] w-[782.667px]" data-name="Button">
      <Icon1 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[405.78px] text-[#1e3338] text-[16px] text-center text-nowrap top-[10.33px] translate-x-[-50%] whitespace-pre">Save Warehouse</p>
    </div>
  );
}

function Form() {
  return (
    <div className="h-[405.333px] relative shrink-0 w-full" data-name="Form">
      <Container7 />
      <Container8 />
      <Container9 />
      <Button />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[24px] h-[534.667px] items-start left-0 pb-[0.667px] pt-[32.667px] px-[32.667px] rounded-[16px] top-0 w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container6 />
      <Form />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p27c543b0} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p2d59bff0} id="Vector_2" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#2c4b52] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[28px] relative shrink-0 w-[187.969px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[28px] relative w-[187.969px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] whitespace-pre">Warehouse Locations</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Heading4 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[118.854px]" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1.67px] whitespace-pre">Main Warehouse</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[rgba(0,217,163,0.2)] h-[32px] left-0 rounded-[10px] top-[28px] w-[82.583px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[12px] text-[#00d9a3] text-[16px] text-nowrap top-[2.33px] whitespace-pre">WH-001</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[60px] relative shrink-0 w-[118.854px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[118.854px]">
        <Heading3 />
        <Text />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 19">
            <path d={svgPaths.p217d1800} id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex h-[60px] items-start justify-between relative w-full">
          <Container13 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">123 Industrial Ave, City, State 12345</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-[#2c4b52] h-[137.333px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[137.333px] items-start pb-[0.667px] pt-[20.667px] px-[20.667px] relative w-full">
          <Container14 />
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[179.76px]" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1.67px] whitespace-pre">North Distribution Center</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute bg-[rgba(0,217,163,0.2)] h-[32px] left-0 rounded-[10px] top-[28px] w-[82.583px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[12px] text-[#00d9a3] text-[16px] text-nowrap top-[2.33px] whitespace-pre">WH-002</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[60px] relative shrink-0 w-[179.76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[60px] relative w-[179.76px]">
        <Heading5 />
        <Text1 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 19">
            <path d={svgPaths.p217d1800} id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
            <path d={svgPaths.p2314a170} id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[60px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex h-[60px] items-start justify-between relative w-full">
          <Container16 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">456 Commerce Blvd, City, State 12346</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#2c4b52] h-[137.333px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[137.333px] items-start pb-[0.667px] pt-[20.667px] px-[20.667px] relative w-full">
          <Container17 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[290.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[24px] h-[420px] items-start left-0 pb-[0.667px] pt-[32.667px] px-[32.667px] rounded-[16px] top-[566.67px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container12 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[986.667px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container20 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Warehouses</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">2</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-0 pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Active Locations</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[#00d9a3] text-[30px] text-nowrap top-[-3px] whitespace-pre">2</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-[290.67px] pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Capacity</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">15,000 m²</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-[581.33px] pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[117.333px] relative shrink-0 w-full" data-name="Container">
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[1300px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[1300px] items-start pb-0 pt-[32px] px-[24px] relative w-full">
          <Container4 />
          <Container21 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Warehouse() {
  return (
    <div className="bg-[#2c4b52] content-stretch flex flex-col h-[1380.67px] items-start relative shrink-0 w-full" data-name="Warehouse">
      <Navigation />
      <Container26 />
    </div>
  );
}

export default function CreateThemedLoginPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Themed Login Page">
      <Warehouse />
    </div>
  );
}
import svgPaths from "./svg-0xl03li6bh";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

function ImageWithFallback() {
  return (
    <div className="h-[184px] relative shrink-0 w-[182px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[184px] w-[182px]" />
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
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] tracking-[1px] whitespace-pre">{`Stock Master `}</p>
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
    <div className="absolute h-[24px] left-[313.16px] top-[3px] w-[94.281px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Move History</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="absolute h-[30px] left-[439.44px] top-0 w-[56.854px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#00d9a3] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Settings</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[30px] relative shrink-0 w-[496.292px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-[496.292px]">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[48px] items-center justify-between pl-0 pr-[0.01px] py-0 relative w-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
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
    <div className="absolute h-[36px] left-[32.67px] top-[32.67px] w-[105.958px]" data-name="Heading 2">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-red-400 top-[-3px] whitespace-pre">location</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Name:</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[42px] items-center px-[4px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter location name</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Short Code:</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[42px] items-center px-[4px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter short code</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <TextInput1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">warehouse:</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[42px] items-center px-[4px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">WH</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[78px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <TextInput2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[298px] items-start left-[32.67px] top-[100.67px] w-[782.667px]" data-name="Container">
      <Container4 />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#1e3338] h-[520.667px] left-0 rounded-[16px] top-0 w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading1 />
      <Container7 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[187.823px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-start relative w-[187.823px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[32px] relative shrink-0 text-[#00d9a3] text-[24px] text-nowrap whitespace-pre">Existing Locations</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[24px] relative shrink-0 w-[76.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[76.313px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] top-[-1.67px] w-[77px]">3 locations</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Text />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1.67px] whitespace-pre">Stock Room 1</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[39.31px] top-[0.67px] w-[23.365px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">SR1</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.677px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[62.677px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Code:</p>
        <Text1 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[76.03px] top-[0.67px] w-[45.667px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">WH001</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[121.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[121.698px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Warehouse:</p>
        <Text3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text4 />
    </div>
  );
}

function Container11() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start relative w-full">
        <Heading3 />
        <Container10 />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-[26px]">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path d={svgPaths.p3c6e6600} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
            <path d="M0.75 0.75H14.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d={svgPaths.p14f55180} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[26px] items-start pb-0 pt-[4px] px-[4px] relative w-full">
          <Icon1 />
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[26px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[26px] items-start relative w-[60px]">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex h-[52px] items-start justify-between relative w-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[#2c4b52] h-[85.333px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[85.333px] items-start pb-[0.667px] pt-[16.667px] px-[16.667px] relative w-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1.67px] whitespace-pre">Stock Room 2</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[39.31px] top-[0.67px] w-[23.365px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">SR2</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[62.677px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[62.677px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Code:</p>
        <Text5 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[76.03px] top-[0.67px] w-[45.667px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">WH001</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[121.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[121.698px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Warehouse:</p>
        <Text7 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Text6 />
      <Text8 />
    </div>
  );
}

function Container16() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start relative w-full">
        <Heading4 />
        <Container15 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-[26px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path d={svgPaths.p3c6e6600} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
            <path d="M0.75 0.75H14.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d={svgPaths.p14f55180} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[26px] items-start pb-0 pt-[4px] px-[4px] relative w-full">
          <Icon3 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[26px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[26px] items-start relative w-[60px]">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex h-[52px] items-start justify-between relative w-full">
          <Container16 />
          <Container17 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#2c4b52] h-[85.333px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[85.333px] items-start pb-[0.667px] pt-[16.667px] px-[16.667px] relative w-full">
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1.67px] whitespace-pre">Loading Bay</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[39.31px] top-[0.67px] w-[22.167px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">LB1</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[61.479px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[61.479px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Code:</p>
        <Text9 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[18.667px] items-start left-[76.03px] top-[0.67px] w-[45.667px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#00d9a3] text-[14px] text-nowrap whitespace-pre">WH001</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[121.698px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[121.698px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8ba6ac] text-[14px] text-nowrap top-[-1.33px] whitespace-pre">Warehouse:</p>
        <Text11 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[16px] h-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Text10 />
      <Text12 />
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 grow h-[52px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[52px] items-start relative w-full">
        <Heading5 />
        <Container20 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.33%_8.34%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path d={svgPaths.p1d9f8700} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[26px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-[4px] relative size-[26px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_29.17%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_41.67%_29.17%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-0.75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
            <path d="M0.75 0.75V5.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[20.83%] right-[20.83%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-6.25%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path d={svgPaths.p3c6e6600} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.75px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 2">
            <path d="M0.75 0.75H14.25" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[33.33%] top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 5">
            <path d={svgPaths.p14f55180} id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="basis-0 grow h-[26px] min-h-px min-w-px relative shrink-0" data-name="Button">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[26px] items-start pb-0 pt-[4px] px-[4px] relative w-full">
          <Icon5 />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[26px] relative shrink-0 w-[60px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[26px] items-start relative w-[60px]">
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex h-[52px] items-start justify-between relative w-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="bg-[#2c4b52] h-[85.333px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[85.333px] items-start pb-[0.667px] pt-[16.667px] px-[16.667px] relative w-full">
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[288px] items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container19 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[24px] h-[409.333px] items-start left-0 pb-[0.667px] pt-[32.667px] px-[32.667px] rounded-[16px] top-[552.67px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Container9 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[962px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container26 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Locations</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">3</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-0 pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Warehouses</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[#00d9a3] text-[30px] text-nowrap top-[-3px] whitespace-pre">1</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-[290.67px] pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Last Updated</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] whitespace-pre">Today</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start left-[581.33px] pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-0 w-[266.667px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[117.333px] relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[1175.33px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[32px] h-[1175.33px] items-start pb-0 pt-[32px] px-[24px] relative w-full">
          <Container27 />
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="bg-[#2c4b52] content-stretch flex flex-col h-[1256px] items-start relative shrink-0 w-full" data-name="Location">
      <Navigation />
      <Container32 />
    </div>
  );
}

export default function CreateThemedLoginPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Themed Login Page">
      <Location />
    </div>
  );
}
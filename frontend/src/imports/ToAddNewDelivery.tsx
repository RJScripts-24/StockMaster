import svgPaths from "./svg-atj912rog6";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

function ImageWithFallback() {
  return (
    <div className="h-[208px] relative shrink-0 w-[290px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[208px] w-[290px]" />
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
    <div className="absolute h-[30px] left-[109.11px] top-0 w-[78.063px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#00d9a3] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Operations</p>
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
    <div className="absolute h-[24px] left-[439.44px] top-[3px] w-[56.854px]" data-name="Link">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Settings</p>
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
    <div className="bg-[#1e3338] box-border content-stretch flex flex-col h-[80.667px] items-start pb-[0.667px] pt-[16px] px-[24px] relative shrink-0 w-[896px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <Container3 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1e3338] h-[44px] relative rounded-[10px] shrink-0 w-[83.906px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00d9a3] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[83.906px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[42.5px] text-[#00d9a3] text-[16px] text-center text-nowrap top-[8.33px] translate-x-[-50%] whitespace-pre">New</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-full">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">Delivery</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[44px] relative shrink-0 w-[206.167px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[44px] items-center relative w-[206.167px]">
        <Button />
        <Heading1 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#00d9a3] h-[40px] relative rounded-[10px] shrink-0 w-[104.01px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[104.01px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[52.5px] text-[#1e3338] text-[16px] text-center text-nowrap top-[6.33px] translate-x-[-50%] whitespace-pre">Validate</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1e3338] h-[41.333px] relative rounded-[10px] shrink-0 w-[82.208px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[41.333px] relative w-[82.208px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[41.17px] text-[#b4cdd4] text-[16px] text-center text-nowrap top-[7px] translate-x-[-50%] whitespace-pre">Print</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#1e3338] h-[41.333px] relative rounded-[10px] shrink-0 w-[96.073px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[41.333px] relative w-[96.073px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[47.67px] text-[16px] text-center text-nowrap text-red-400 top-[7px] translate-x-[-50%] whitespace-pre">Cancel</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[41.333px] relative shrink-0 w-[314.292px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[41.333px] items-center relative w-[314.292px]">
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[24px] left-[563.55px] top-0 w-[35.354px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Draft</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[24px] left-[606.91px] top-0 w-[10.948px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">{`>`}</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[24px] left-[625.85px] top-0 w-[54.115px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Waiting</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[24px] left-[687.97px] top-0 w-[10.948px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">{`>`}</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[24px] left-[706.92px] top-0 w-[42.781px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Ready</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[24px] left-[757.7px] top-0 w-[10.948px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">{`>`}</p>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[24px] left-[776.65px] top-0 w-[38.021px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#6b8690] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Done</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
      <Text2 />
      <Text3 />
      <Text4 />
      <Text5 />
      <Text6 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#1e3338] h-[57.333px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[57.333px] items-start pb-[0.667px] pt-[16.667px] px-[16.667px] relative w-full">
          <Container7 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="basis-0 font-['Arimo:Regular',sans-serif] font-normal grow leading-[32px] min-h-px min-w-px relative shrink-0 text-[24px] text-red-400">WH/OUT/0001</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Delivery Address</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[42px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter delivery address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-0 top-0 w-[379.333px]" data-name="Container">
      <Label />
      <TextInput />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Schedule Date</p>
    </div>
  );
}

function DatePicker() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Date Picker">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[403.33px] top-0 w-[379.333px]" data-name="Container">
      <Label1 />
      <DatePicker />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Responsible</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="Text Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[42px] items-center px-[16px] py-[8px] relative w-full">
          <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Enter responsible person</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-0 top-[98px] w-[379.333px]" data-name="Container">
      <Label2 />
      <TextInput1 />
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Label">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Operation type</p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-460px] size-0 top-[-480.67px]" data-name="Option" />;
}

function Dropdown() {
  return (
    <div className="h-[40.667px] relative shrink-0 w-full" data-name="Dropdown">
      <div aria-hidden="true" className="absolute border-[0px_0px_2px] border-red-400 border-solid inset-0 pointer-events-none" />
      {[...Array(3).keys()].map((_, i) => (
        <Option key={i} />
      ))}
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[74px] items-start left-[403.33px] top-[98px] w-[379.333px]" data-name="Container">
      <Label3 />
      <Dropdown />
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[172px] relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[782.667px]" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Products</p>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[48.333px] left-0 top-0 w-[385.458px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[16px] text-[#b4cdd4] text-[16px] text-nowrap top-[10.33px] whitespace-pre">Product</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[48.333px] left-[385.46px] top-0 w-[262.75px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[16px] text-[#b4cdd4] text-[16px] text-nowrap top-[10.33px] whitespace-pre">Quantity</p>
    </div>
  );
}

function HeaderCell2() {
  return <div className="absolute h-[48.333px] left-[648.21px] top-0 w-[134.458px]" data-name="Header Cell" />;
}

function TableRow() {
  return (
    <div className="absolute h-[48.333px] left-0 top-0 w-[782.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[48.333px] left-0 top-0 w-[782.667px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[12.33px] w-[111.354px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-white top-[-1.67px] w-[112px]">[DESK001] Desk</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[48.667px] left-0 top-0 w-[385.458px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[48.667px] left-[385.46px] top-0 w-[262.75px]" data-name="Table Cell">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[16px] text-[16px] text-nowrap text-white top-[10.67px] whitespace-pre">6</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M7.5 8.25V12.75" id="Vector" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M10.5 8.25V12.75" id="Vector_2" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p3357c900} id="Vector_3" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 4.5H15.75" id="Vector_4" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p19dfc880} id="Vector_5" stroke="var(--stroke-0, #6B8690)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute left-[16px] size-[18px] top-[13px]" data-name="Button">
      <Icon />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[48.667px] left-[648.21px] top-0 w-[134.458px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[48.667px] left-0 top-0 w-[782.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[48.667px] left-0 top-[48.33px] w-[782.667px]" data-name="Table Body">
      <TableRow1 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute bg-[#2c4b52] h-[97.333px] left-0 overflow-clip rounded-[10px] top-[40px] w-[782.667px]" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[16px] top-[4px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #F87171)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[24px] left-0 top-[153.33px] w-[149.469px]" data-name="Button">
      <Icon1 />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[87.5px] text-[16px] text-center text-nowrap text-red-400 top-[-1.67px] translate-x-[-50%] whitespace-pre">Add New product</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[177.333px] relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Table />
      <Button5 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[24px] h-[502.667px] items-start left-0 pb-[0.667px] pt-[32.667px] px-[32.667px] rounded-[16px] top-0 w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading2 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-red-400 top-[-1.67px] whitespace-pre">Status Information</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Draft: Initial state</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">The delivery order has been created but not yet validated.</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[orange] text-nowrap top-[-1.67px] whitespace-pre">Waiting: Waiting for the out of stock product to be in</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Some products are out of stock and need to be replenished.</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-green-400 text-nowrap top-[-1.67px] whitespace-pre">Ready: Ready to deliver/receive</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">All products are in stock and ready for delivery.</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Done: Received or delivered</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">The delivery has been completed successfully.</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Text8() {
  return <div className="absolute h-[24px] left-[24px] top-0 w-[465.208px]" data-name="Text" />;
}

function Paragraph8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <Text8 />
    </div>
  );
}

function Container20() {
  return (
    <div className="box-border content-stretch flex flex-col h-[40.667px] items-start pb-0 pt-[16.667px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px_0px_0px] border-solid inset-0 pointer-events-none" />
      <Paragraph8 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[312.667px] items-start relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col gap-[16px] h-[402px] items-start left-0 pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[16px] top-[526.67px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Heading4 />
      <Container21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[928.667px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[24px] h-[1142px] items-start pb-0 pt-[32px] px-[24px] relative shrink-0 w-[896px]" data-name="Container">
      <Container6 />
      <Container8 />
      <Container23 />
    </div>
  );
}

function DeliveryForm() {
  return (
    <div className="bg-[#2c4b52] content-stretch flex flex-col h-[1222.67px] items-start relative shrink-0" data-name="DeliveryForm">
      <Navigation />
      <Container24 />
    </div>
  );
}

export default function ToAddNewDelivery() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="TO add new delivery">
      <DeliveryForm />
    </div>
  );
}
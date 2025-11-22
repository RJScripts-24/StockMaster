import svgPaths from "./svg-ffd1w4m3yt";
import imgImageWithFallback from "figma:asset/4ca9b3623e2c0ac1d98ff64875d9b426ddff926e.png";

function ImageWithFallback() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[36px]" />
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
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[28px] left-0 text-[20px] text-nowrap text-white top-[-2.33px] tracking-[1px] whitespace-pre">INVENTORY</p>
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
    <div className="absolute h-[30px] left-[219.18px] top-0 w-[61.979px]" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#00d9a3] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#00d9a3] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Products</p>
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

function ImageWithFallback1() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[36px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#00d9a3] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <ImageWithFallback1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[48px] items-center justify-between pl-0 pr-[0.01px] py-0 relative w-full">
          <Container1 />
          <Container2 />
          <Container3 />
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
          <Container4 />
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
    <div className="bg-[#1e3338] h-[44px] relative rounded-[10px] shrink-0 w-[188.083px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00d9a3] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[188.083px]">
        <Icon />
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[108px] text-[#00d9a3] text-[16px] text-center text-nowrap top-[8.33px] translate-x-[-50%] whitespace-pre">ADD PRODUCT</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[71.49px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[71.49px]">
        <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">Stock</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[44px] items-center left-0 top-0 w-[275.573px]" data-name="Container">
      <Button />
      <Heading1 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#1e3338] h-[41.333px] left-0 rounded-[10px] top-0 w-[256px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[41.333px] items-center overflow-clip pl-[40px] pr-[16px] py-[8px] relative rounded-[inherit] w-[256px]">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6b8690] text-[16px] text-nowrap whitespace-pre">Search products...</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Icon1() {
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
    <div className="absolute h-[41.333px] left-[592px] top-[1.33px] w-[256px]" data-name="Container">
      <TextInput />
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[44px] left-[24px] top-[32px] w-[848px]" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[80.333px] left-0 top-0 w-[123.354px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.33px] w-[60px]">Product ID</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[80.333px] left-[123.35px] top-0 w-[141.646px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.33px] w-[60px]">Product Name</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[80.333px] left-[265px] top-0 w-[134.573px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] text-nowrap top-[26.33px] whitespace-pre">Status</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[80.333px] left-[399.57px] top-0 w-[124.542px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.33px] w-[60px]">per unit cost</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[80.333px] left-[524.11px] top-0 w-[104.167px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.33px] w-[38px]">On hand</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[80.333px] left-[628.28px] top-0 w-[114.135px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] top-[14.33px] w-[51px]">free to Use</p>
    </div>
  );
}

function HeaderCell6() {
  return (
    <div className="absolute h-[80.333px] left-[742.42px] top-0 w-[104.25px]" data-name="Header Cell">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-[24px] text-[#00d9a3] text-[16px] text-nowrap top-[26.33px] whitespace-pre">Actions</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[80.333px] left-0 top-0 w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
      <HeaderCell6 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute h-[80.333px] left-0 top-0 w-[846.667px]" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[62.969px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#00d9a3] text-[16px] text-nowrap whitespace-pre">DESK001</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[56.667px] left-0 top-0 w-[123.354px]" data-name="Table Cell">
      <Text />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[34.333px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Desk</p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[56.667px] left-[123.35px] top-0 w-[141.646px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[13.67px] w-[67.042px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">Active</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[56.667px] left-[265px] top-0 w-[134.573px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21.333px] left-[24px] top-[17.67px] w-[55.25px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] top-[-3px] w-[56px]">3000 Rs</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[56.667px] left-[399.57px] top-0 w-[124.542px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">50</p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[56.667px] left-[524.11px] top-0 w-[104.167px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">45</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[56.667px] left-[628.28px] top-0 w-[114.135px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_2989)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_2989">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[17px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[56.667px] left-[742.42px] top-0 w-[104.25px]" data-name="Table Cell">
      <Button1 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[56.667px] left-0 top-0 w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[50.969px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#00d9a3] text-[16px] text-nowrap whitespace-pre">TBL001</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[56.667px] left-0 top-0 w-[123.354px]" data-name="Table Cell">
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[36.375px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Table</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[56.667px] left-[123.35px] top-0 w-[141.646px]" data-name="Table Cell">
      <Text7 />
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[13.67px] w-[67.042px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">Active</p>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[56.667px] left-[265px] top-0 w-[134.573px]" data-name="Table Cell">
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[21.333px] left-[24px] top-[17.67px] w-[55.25px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] top-[-3px] w-[56px]">3000 Rs</p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[56.667px] left-[399.57px] top-0 w-[124.542px]" data-name="Table Cell">
      <Text9 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">50</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[56.667px] left-[524.11px] top-0 w-[104.167px]" data-name="Table Cell">
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">50</p>
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[56.667px] left-[628.28px] top-0 w-[114.135px]" data-name="Table Cell">
      <Text11 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_2989)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_2989">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[17px]" data-name="Button">
      <Icon3 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[56.667px] left-[742.42px] top-0 w-[104.25px]" data-name="Table Cell">
      <Button2 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[56.667px] left-0 top-[56.67px] w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[56.719px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#00d9a3] text-[16px] text-nowrap whitespace-pre">CHR001</p>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[56.667px] left-0 top-0 w-[123.354px]" data-name="Table Cell">
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[36.542px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Chair</p>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[56.667px] left-[123.35px] top-0 w-[141.646px]" data-name="Table Cell">
      <Text13 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[13.67px] w-[67.042px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">Active</p>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[56.667px] left-[265px] top-0 w-[134.573px]" data-name="Table Cell">
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute h-[21.333px] left-[24px] top-[17.67px] w-[55.25px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] top-[-3px] w-[56px]">1500 Rs</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[56.667px] left-[399.57px] top-0 w-[124.542px]" data-name="Table Cell">
      <Text15 />
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[25.875px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">120</p>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="absolute h-[56.667px] left-[524.11px] top-0 w-[104.167px]" data-name="Table Cell">
      <Text16 />
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[25.875px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">110</p>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="absolute h-[56.667px] left-[628.28px] top-0 w-[114.135px]" data-name="Table Cell">
      <Text17 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_2989)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_2989">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[17px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function TableCell20() {
  return (
    <div className="absolute h-[56.667px] left-[742.42px] top-0 w-[104.25px]" data-name="Table Cell">
      <Button3 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[56.667px] left-0 top-[113.33px] w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[29.67px] w-[55.281px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#00d9a3] text-[16px] text-nowrap whitespace-pre">CAB001</p>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="absolute h-[80.667px] left-0 top-0 w-[123.354px]" data-name="Table Cell">
      <Text18 />
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[29.67px] w-[54.177px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Cabinet</p>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="absolute h-[80.667px] left-[123.35px] top-0 w-[141.646px]" data-name="Table Cell">
      <Text19 />
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[rgba(255,165,0,0.1)] h-[25px] left-[24.33px] rounded-[10px] top-[13.33px] w-[74px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[0.33px] text-[16px] text-[orange] top-[0.67px] w-[98px]">Low Stock</p>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="absolute h-[80.667px] left-[265px] top-0 w-[134.573px]" data-name="Table Cell">
      <Text20 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute h-[21.333px] left-[24px] top-[29.67px] w-[55.25px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] top-[-3px] w-[56px]">5000 Rs</p>
    </div>
  );
}

function TableCell24() {
  return (
    <div className="absolute h-[80.667px] left-[399.57px] top-0 w-[124.542px]" data-name="Table Cell">
      <Text21 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[29.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">30</p>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="absolute h-[80.667px] left-[524.11px] top-0 w-[104.167px]" data-name="Table Cell">
      <Text22 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[29.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">28</p>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="absolute h-[80.667px] left-[628.28px] top-0 w-[114.135px]" data-name="Table Cell">
      <Text23 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_2989)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_2989">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[29px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function TableCell27() {
  return (
    <div className="absolute h-[80.667px] left-[742.42px] top-0 w-[104.25px]" data-name="Table Cell">
      <Button4 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[80.667px] left-0 top-[170px] w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell21 />
      <TableCell22 />
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[56.74px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#00d9a3] text-[16px] text-nowrap whitespace-pre">LMP001</p>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="absolute h-[56.667px] left-0 top-0 w-[123.354px]" data-name="Table Cell">
      <Text24 />
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[38.865px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">Lamp</p>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="absolute h-[56.667px] left-[123.35px] top-0 w-[141.646px]" data-name="Table Cell">
      <Text25 />
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[rgba(74,222,128,0.1)] box-border content-stretch flex h-[29.333px] items-start left-[24px] px-[12px] py-[4px] rounded-[10px] top-[13.67px] w-[67.042px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-green-400 text-nowrap whitespace-pre">Active</p>
    </div>
  );
}

function TableCell30() {
  return (
    <div className="absolute h-[56.667px] left-[265px] top-0 w-[134.573px]" data-name="Table Cell">
      <Text26 />
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute h-[21.333px] left-[24px] top-[17.67px] w-[46.625px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#b4cdd4] text-[16px] top-[-3px] w-[47px]">800 Rs</p>
    </div>
  );
}

function TableCell31() {
  return (
    <div className="absolute h-[56.667px] left-[399.57px] top-0 w-[124.542px]" data-name="Table Cell">
      <Text27 />
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">75</p>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="absolute h-[56.667px] left-[524.11px] top-0 w-[104.167px]" data-name="Table Cell">
      <Text28 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute content-stretch flex h-[21.333px] items-start left-[24px] top-[17.67px] w-[17.25px]" data-name="Text">
      <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#b4cdd4] text-[16px] text-nowrap whitespace-pre">75</p>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="absolute h-[56.667px] left-[628.28px] top-0 w-[114.135px]" data-name="Table Cell">
      <Text29 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-0 size-[18px] top-0" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_17_2989)" id="Icon">
          <path d={svgPaths.p31ba2480} id="Vector" stroke="var(--stroke-0, #00D9A3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_17_2989">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute left-[24px] size-[18px] top-[17px]" data-name="Button">
      <Icon6 />
    </div>
  );
}

function TableCell34() {
  return (
    <div className="absolute h-[56.667px] left-[742.42px] top-0 w-[104.25px]" data-name="Table Cell">
      <Button5 />
    </div>
  );
}

function TableRow5() {
  return (
    <div className="absolute h-[56.667px] left-0 top-[250.67px] w-[846.667px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0px_0px_0.667px] border-solid inset-0 pointer-events-none" />
      <TableCell28 />
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[307.333px] left-0 top-[80.33px] w-[846.667px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
      <TableRow5 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[388px] overflow-clip relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#1e3338] h-[389.333px] left-[24px] rounded-[16px] top-[108px] w-[848px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[389.333px] items-start overflow-clip p-[0.667px] relative rounded-[inherit] w-[848px]">
        <Table />
      </div>
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-[398.98px] text-[#b4cdd4] text-[16px] text-center text-nowrap top-[-1.67px] translate-x-[-50%] whitespace-pre">User must be able to update the stock from here.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[#1e3338] box-border content-stretch flex flex-col h-[73.333px] items-start left-[24px] pb-[0.667px] pt-[24.667px] px-[24.667px] rounded-[14px] top-[521.33px] w-[848px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Products</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">5</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="[grid-area:1_/_1] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph1 />
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Stock Value</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-[0.33px] text-[#00d9a3] text-[30px] top-[-3px] w-[184px]">₹690,000</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_2] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph3 />
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Total Units On Hand</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-nowrap text-white top-[-3px] whitespace-pre">325</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:1_/_3] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph5 />
          <Paragraph6 />
        </div>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#8ba6ac] text-[16px] text-nowrap top-[-1.67px] whitespace-pre">Free to Use</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[36px] left-0 text-[30px] text-green-400 text-nowrap top-[-3px] whitespace-pre">308</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:1_/_4] bg-[#1e3338] h-[117.333px] relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a5a62] border-[0.667px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[117.333px] items-start pb-[0.667px] pt-[24.667px] px-[24.667px] relative w-full">
          <Paragraph7 />
          <Paragraph8 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute gap-[24px] grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[117.333px] left-[24px] top-[618.67px] w-[848px]" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[768px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container8 />
      <Container9 />
      <Container14 />
    </div>
  );
}

function Stock() {
  return (
    <div className="bg-[#2c4b52] content-stretch flex flex-col h-[848.667px] items-start relative shrink-0 w-full" data-name="Stock">
      <Navigation />
      <Container15 />
    </div>
  );
}

export default function CreateThemedLoginPage() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Create Themed Login Page">
      <Stock />
    </div>
  );
}
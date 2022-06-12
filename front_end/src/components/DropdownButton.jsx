import cn from "classnames";
import { useCollapseCtrl } from "../hooks";
import { Box } from "../styledComponents/Layout";
import { Collapse } from "./HiddenSpace";

export default function DropdownButton({
  wrapperCn,
  width,
  IconLeft,
  iconLeftCn,
  btnText,
  IconRight,
  iconRightCn,
  collapseCn,
  listWrapperCn,
  listItems,
  renderItem,
}) {
  const [collapsed, setCollapsed, ctrlRef, collapseRef] = useCollapseCtrl();
  return (
    <Box className={cn("pos-relative", wrapperCn)} width={width}>
      <button ref={ctrlRef} className="btn full-w full-h flex">
        {IconLeft && <IconLeft className={iconLeftCn} />}
        {btnText}
        {IconRight && <IconRight className={iconRightCn} />}
      </button>
      <Collapse className={collapseCn} open={collapsed}>
        <div
          ref={collapseRef}
          className={listWrapperCn}
          onClick={() => {
            setCollapsed(false);
          }}
        >
          {listItems.map(renderItem)}
        </div>
      </Collapse>
    </Box>
  );
}

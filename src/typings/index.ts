declare interface DragItem {
    class: string; //实体 entity, 虚体 dotted
    text: any;
}
declare interface DragingData{
    x: number;
    y: number;
    el: HTMLElement;
}

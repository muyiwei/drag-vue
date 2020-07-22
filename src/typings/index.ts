declare interface DragItem {
    class: string; //实体 entity, 虚体 dotted
    text: any;
    id:number;
}
declare interface DragingData{
    x: number;
    y: number;
    el: HTMLElement;
}

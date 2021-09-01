/// <reference path="./template.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/dragDrop.ts" />
/// <reference path="../decorators/AutoBind.ts" />

namespace App {
  export class ProjectItem
    extends Template<HTMLDivElement, HTMLLIElement>
    implements Draggable
  {
    private projectInfo: Project;

    get persons() {
      const { people } = this.projectInfo;
      return people > 1 ? `${people} Persons` : "1 Person";
    }

    constructor(projectInfo: Project) {
      super(
        "single-project",
        `${projectInfo.status}-project-list`,
        false,
        projectInfo.id
      );
      this.projectInfo = projectInfo;

      this.configure();
    }

    @AutoBind
    dragStartHandler(e: DragEvent): void {
      e.dataTransfer!.setData("text/plain", this.projectInfo.id);
      e.dataTransfer!.effectAllowed = "move";
    }
    @AutoBind
    dragEndHandler(_e: DragEvent): void {
      console.log("drag end");
    }

    renderContent() {
      const { title, description } = this.projectInfo;
      this.element.querySelector("h2")!.textContent = title;
      this.element.querySelector("p")!.textContent = description;
      this.element.querySelector(
        "h3"
      )!.textContent = `${this.persons} Assigned`;
    }
    configure() {
      this.element.draggable = true;
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }
  }
}

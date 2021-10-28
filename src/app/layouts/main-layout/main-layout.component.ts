import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/shared/services/global-service";
@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit {
  constructor(public globalService: GlobalService) {}

  ngOnInit(): void {}
}

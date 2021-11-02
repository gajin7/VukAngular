import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthStoreService } from "src/app/shared/services/auth-store-service";
import { AuthWebService } from "src/app/shared/web-services/auth-web.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  role: string | null = null;
  displayName: string = "";
  initals: string = "";

  constructor(
    public authStoreService: AuthStoreService,
    private authWebService: AuthWebService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authStoreService.user$.subscribe((value) => {
      if (value) {
        this.role = value.Type;
        this.displayName = value.FirstName;
        this.initals = value.FirstName[0] + value?.LastName[0] || "";
      }
    });
  }

  logOut(): void {
    this.authWebService.logout().subscribe(() => {
      this.authStoreService.token = null;
      this.authStoreService.user = null;
      this.router.navigate(["auth"]);
    });
  }

  openProfile() {
    this.router.navigate(["profile"]);
  }
}

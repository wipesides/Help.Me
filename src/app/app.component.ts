import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CommunityComponent } from './community/community.component';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    NewsComponent,
    FeedComponent,
    HeaderComponent,
    ExploreComponent,
    HomeComponent,
    ProfileComponent,
    SettingsComponent,
    AboutUsComponent,
    CommunityComponent,
    CommonModule,
    OptionsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './../styles.css',
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'help-me';
}
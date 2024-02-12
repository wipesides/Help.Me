import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CreateHelpComponent } from './create-help/create-help.component';
import { CommunityComponent } from './community/community.component';
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'',
        redirectTo:'home',
        pathMatch: 'full',
    },
    {
        path:'settings',
        component: SettingsComponent,
        title: 'Settings'    
    },
    {
        path:'explore',
        component: ExploreComponent,
        title:'Explore'
    },
    {
        path:'profile',
        component: ProfileComponent,
        title:'Profile'
    },
    {
        path:'about-us',
        component: AboutUsComponent,
        title:'Who are we?'
    },
    {
        path:'create-help',
        component: CreateHelpComponent,
        title:'Create a help'
    },
    {
        path:'community',
        component: CommunityComponent,
        title:'Communities'
    }
];
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        [RouterModule]
    ]
})
export class AppRoutingModule{}
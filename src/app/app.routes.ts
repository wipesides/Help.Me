import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CreateHelpComponent } from './create-help/create-help.component';
import { CommunityComponent } from './community/community.component';
import { NgModule } from '@angular/core';
import { FeedComponent } from './feed/feed.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthguardService } from './authguard.service';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent,
        canActivate: mapToCanActivate([AuthguardService])
    },
    {
        path:'',
        redirectTo:'home',
        pathMatch: 'full',
    },
    {
        path:'settings',
        component: SettingsComponent,
        title: 'Settings',
        canActivate: mapToCanActivate([AuthguardService]),
    },
    {
        path:'explore',
        component: ExploreComponent,
        title:'Explore',
        canActivate: mapToCanActivate([AuthguardService])
    },
    {
        path:'profile',
        component: ProfileComponent,
        title:'Profile',
        canActivate: mapToCanActivate([AuthguardService])
    },
    {
        path:'about-us',
        component: AboutUsComponent,
        title:'Who are we?'
    },
    {
        path:'create-help',
        component: CreateHelpComponent,
        title:'Create a help',
        canActivate: mapToCanActivate([AuthguardService])
    },
    {
        path:'community',
        component: CommunityComponent,
        title:'Communities',
        canActivate: mapToCanActivate([AuthguardService])
    },
    {
        path:'sign-up',
        component: SignUpComponent,
        title: 'Sign Up',
    },
    {
        path:'sign-in',
        component: SignInComponent,
        title:'Sign In'
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
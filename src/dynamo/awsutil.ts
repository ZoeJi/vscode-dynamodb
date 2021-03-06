'use strict';

import { readFileSync } from 'fs';
import { workspace, window } from 'vscode';

let homedir = require('os').homedir();

export function getRegionFromProfile(profile: string): string {
    let _region: string;
    let _regexCut: RegExp = new RegExp(`^[\\s\\S.]*${profile}\\]`,"gi")
    let _data: string = readFileSync(homedir + "/.aws/config", "UTF8");

    if (_data) {
        _region = _data.replace(_regexCut,"").match(/[a-z]{2}-[a-z,-]*[0-9]{1}/)[0];
    } else {
        _region = workspace.getConfiguration('dynamo').get('region');
        window.showErrorMessage('Failed to retrieve region!')
    }

    return _region;
}

export function getProfiles(): string[] {
    let _profiles: string[];
    let _data: string = readFileSync(homedir + "/.aws/credentials", "UTF8");
    
    _profiles = _data.match(/\[.*?\]/g);
    _profiles.forEach(element => {
    _profiles[_profiles.indexOf(element)] = element.replace(/\[|\]/g,"");
    });

    return _profiles;
}
import React from 'react';

export interface ISideBarItem {
  path: string;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>;
  authOnly?: boolean;
}

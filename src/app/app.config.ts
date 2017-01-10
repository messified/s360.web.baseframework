import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
	public config: any = {
		name: 's360BaseProject.app',
		title: 'S360 Base Application Project',
		version: '1.1.1',
		servicePath: '',
        /**
         * Whether to print and alert some log information
         */
		debug: true,
        /**
         * In-app constants
         */
		settings: {
			colors: {
				white: '#fff',
				black: '#000',
				'gray-light': '#999',
				'gray-lighter': '#eee',
				gray: '#666',
				'gray-dark': '#343434',
				'gray-darker': '#222',
				'gray-semi-light': '#777',
				'gray-semi-lighter': '#ddd',
				'brand-primary': '#5d8fc2',
				'brand-success': '#64bd63',
				'brand-warning': '#f0b518',
				'brand-danger': '#dd5826',
				'brand-info': '#5dc4bf'
			},
			screens: {
				'xs-max': 543,
				'sm-min': 544,
				'sm-max': 767,
				'md-min': 768,
				'md-max': 991,
				'lg-min': 992,
				'lg-max': 1199,
				'xl-min': 1200
			},
			navCollapseTimeout: 2500
		},

        /**
         * Application state. May be changed when using.
         * Synced to Local Storage
         */
		state: {
            /**
             * whether navigation is static (prevent automatic collapsing)
             */
			'nav-static': false
		}
	};
}
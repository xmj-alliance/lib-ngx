export default {
	selector: 'lib-inkbar',
	// templateUrl: './inkbar.component.html',
	// styleUrls: ['./inkbar.component.css']
	template: `
		<main>
			<div class="inkbar" [ngStyle]="inkbarStyle"></div>
		</main>
	`,
	styles: [`
	
		div.inkbar {
			position: absolute;
			bottom: 0;
			height: 2px;
			transition: .5s cubic-bezier(.35,0,.25,1);
			z-index: 10;
		}
	
	`]
}
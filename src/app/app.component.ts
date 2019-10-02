import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Raptor';

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Yo-mamma': 'so-biiig'
            })
        };

        const body = {
            data: JSON.stringify('hello!')
        };

        this.httpClient.post('https://webhook.site/4d141ce4-9d29-4a14-89e4-42b165d0fe44', body, options).subscribe(() => {
            console.log('Http Call is success from component');
        }, (error) => {
            console.log('Http Call is failed from component');
        });
    }
}

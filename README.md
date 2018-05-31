# MojoDiet



## Development environment
1. Node: 9.4.0
2. Angular: 6.0.3
3. Angular CLI: 6.0.5
4. webpack: 4.8.3
5. npm 5.6.0


## Development server

Run `ng serve --base-href '/mojoDiet/'` for a dev server. Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Build

Angular CLI is used as packaging tool which takes care of **minifying, uglifying** code
and **uses webpack** under the hood 

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod` flag for a production build.
##### Deployment instructions
1. run `ng build` or `ng build --prod`, Once build is generated find it in `/dist` folder with subfolder 'mojoDiet'
2. Zip `mojoDiet` folder and transfer to server using SFTP and extract it to `var/www/html` (linux system)
or any other server of your choice.
3. access web app using ip address/domain of server followed by `/mojoDiet`
e.g `http://192.168.1.92/mojoDiet`

## Project functionality
#### Admin section:
* Fixed credentials stored as SHA256 hashed string, No plain text in code.
* Login session handled, will be automatically logged out once browser is closed.
* After logging Two tabs are shown on dashboard (Show dishes and Add Dish):
    * Show Dishes: 
      * See previously added dishes.
      * Delete dish feature.
      * Warning shown if dishes are less than 7
    * Add Dish: 
      * Select image, enter name, price of dish and 
      optional parameter dish type (Starter/Main course),
      * Dishes with duplicate names not allowed.
    
#### Customer section:
* User can register with credentials of his choice.
* Login using registered credentials.
* After logging Two tabs are shown on dashboard 
(Available dishes and Plan Your Diet):
    * Available Dishes:
      * List of all dishes added by admin.
      * Service wont be available if dishes are less than 7.
    * Plan Your Diet:
      * Week displayed from upcoming monday with option to
       select dish for each day.
      * One dish can allocated only one of the days.
      * User can delete selected dish.
      * Total amount shown for added dishes.
      * User can save Diet plan.

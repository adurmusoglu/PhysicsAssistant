/********************
 * Mech PHYS Assistant is meant to help with calculating vector information for mechanical physics.
********************/

#include <iostream>
#include <cmath>
using namespace std;

void displayXYComps();
void displayMagnAngle();
void displayAddVectors();

int main()
{
    bool exitProgram = false;

    while (!exitProgram)
    {
        short int menuChoice;

        // User makes choice of what they want to do

        cout << " PHYS 2325 Assistant\n" 
            << "(1) Find x and y components of vector using magnitude and angle.\n"
            << "(2) Find magnitude of vector and its angle using x and y components.\n"
            << "(3) Add vectors together.\n"
            << "(4) Exit the program.\n"
            << "Enter menu choice: ";
        cin >> menuChoice;

        while (menuChoice > 4 || menuChoice < 1)
        {
            cout << "\nError. Enter a valid menu choice: ";
            cin >> menuChoice;
        }
    
        // Does the action that the user wants

        switch (menuChoice)
        {
            case 1: 
                displayXYComps();
                break;
            case 2: 
                displayMagnAngle();
                break;
            case 3:
                displayAddVectors();
                break;
            case 4: 
                cout << "\nExiting the program. Goodbye!\n";
                exitProgram = true;
                break;
            default:
                cout << "\nError! Something wrong with the program.\n";
                break;
        }
    }
}


// Takes input, calculates, and displays the XY Components of vector

void displayXYComps()
{
    double magnitude, angle;
    
    cout << "Vector magnitude: ";
    cin >> magnitude;
    cout << "Vector angle (DEG): ";
    cin >> angle;

    cout << "\nThe x component of the vector is " << cos(angle * (M_PI / 180)) * magnitude
        << "\nThe y component of the vector is: " << sin(angle * (M_PI / 180)) * magnitude << endl;

    cout << "\nPress ENTER to continue.\n";
    cin.ignore(32, '\n');
    cin.get();
}

// FUNCTION COMMENT HERE

void displayMagnAngle()
{
    double xComp, yComp, angle;
    char addAnother;
    
    // Gets input from user

    cout << "\nEnter the x component of vector: ";
    cin >> xComp;
    cout << "Enter the y component of vector: ";
    cin >> yComp;

    // Adjusts the atan value for the quadrant

    if (xComp < 0) // Quadrants II and III
    {
        angle = (atan(yComp / xComp) * (180 / M_PI)) + 180;
    }
    else if (yComp < 0 && xComp >= 0) // Quadrants IV
    {
        angle = (atan(yComp / xComp) * (180 / M_PI)) + 360;
    }
    else // Quadrant I
    {
        angle = atan(yComp / xComp) * (180 / M_PI);
    }

    cout << "\nThe magnitude is " << sqrt(pow(xComp, 2) + pow(yComp, 2)) << "."
        << "\nThe angle from x+ axis is " << angle << " degrees.\n";
    cout << "\nPress ENTER to continue.\n";
    cin.ignore(32, '\n');
    cin.get();
}

// FUNCTION COMMENT HERE

void displayAddVectors()
{
    double totalX = 0, totalY = 0, angle;
    char addAnother;
    
    do 
    {
        double xComp, yComp, magnitude, origAngle;
        
        // Gets the input from the user

        cout << "\nEnter the magnitude of the vector: ";
        cin >> magnitude;
        cout << "Enter the angle from x+ of the vector in degrees: ";
        cin >> origAngle;

        // Turns the vector info into its components

        xComp = cos(origAngle * (M_PI / 180)) * magnitude;
        yComp = sin(origAngle * (M_PI / 180)) * magnitude;
        cout << "Would you like to add another vector's components?\n"
            << "Enter Y or N: ";
        cin >> addAnother;
        addAnother = toupper(addAnother);
        
        while (addAnother != 'Y' && addAnother != 'N')
        {
            cout << "Error! Enter a valid choice: ";
            cin >> addAnother;
            addAnother = toupper(addAnother);
        } 

        // Adds to cumulative of final vector 

        totalX += xComp;
        totalY += yComp;
    
    } while (addAnother == 'Y');

    // Adjusts the atan value for the quadrant

    if (totalX < 0) // Quadrants II and III
    {
        angle = (atan(totalY / totalX) * (180 / M_PI)) + 180;
    }
    else if (totalY < 0 && totalX >= 0) // Quadrants IV
    {
        angle = (atan(totalY / totalX) * (180 / M_PI)) + 360;
    }
    else // Quadrant I
    {
        angle = atan(totalY / totalX) * (180 / M_PI);
    }

    cout << "\nThe magnitude is " << sqrt(pow(totalX, 2) + pow(totalY, 2)) << "."
        << "\nThe angle from x+ axis is " << angle << " degrees.\n";
    cout << "\nPress ENTER to continue.\n";
    cin.ignore(32, '\n');
    cin.get();
}
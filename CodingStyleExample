/*****************************************
CONSOLE OBJECT
*****************************************/

...

void ConsoleObject::ExecuteConsole()
{
    //dynamic array iterator number, "capped" at 10 elements by comparative checks
    //element number "-1" is the input line, and does not actually try to access any arrays
    static int PreviousInputTextTrackingNumber = -1;

    //add static geometric background shapes
    Rendering->AddGeometry(MessagesRect);
    Rendering->AddGeometry(InputRect);

    //update variables from input
    string currentinput = Input->GetCurrentTextState();
    Keyboard = Input->RetrieveKeyboardStatus();

    if(Keyboard->UP == true)
    {
        //increment tracking number
        PreviousInputTextTrackingNumber ++;

        //out of bounds array iterator check
        int sizeoftextinput = RecentTextInput.size() - 1;
        if(PreviousInputTextTrackingNumber > sizeoftextinput)
        {
            PreviousInputTextTrackingNumber = sizeoftextinput;
        }

        //set input to currently selected stored value
        Input->SetCurrentTextState(RecentTextInput[PreviousInputTextTrackingNumber]);
    }

    if(Keyboard->DOWN == true)
    {
        //increment tracking number
        PreviousInputTextTrackingNumber--;

        //out of bounds array check, also returns input to "blank input" slot "-1"
        if(PreviousInputTextTrackingNumber <= -1)
        {
            currentinput = "";
            Input->SetCurrentTextState(currentinput);
            PreviousInputTextTrackingNumber = -1;
        }
        else
        {
            //set input to currently selected stored value
            Input->SetCurrentTextState(RecentTextInput[PreviousInputTextTrackingNumber]);
        }
    }

    if(Keyboard->ENTER == true)
    {
        //clear the current text input by restarting it
        Input->StartTextInput();

        //add the string to RecentTextInput, except for blank strings
        if(currentinput != "")
        {
            RecentTextInput.push_front(currentinput);

            //parse out input to function identifier string and possible int value
            istringstream iss(currentinput);
            int valueforvaluefunc = 0;
            vector<string> stringparse;
            string item = "";
            string identifier = "";
            char *delim = " ";

            while(getline(iss, item, *delim))
            {
                stringparse.push_back(item);
            }

            //Get value for functions with arguements, if the value exists
            int sizeofstringtest = stringparse.size();
            if(sizeofstringtest > 1)
            {
                valueforvaluefunc = atoi(stringparse[1].c_str());
            }
            identifier = stringparse[0];


            //find GameObject:: functions by identifier strings
            FunctionPointers::iterator tempFuncIterator;
            tempFuncIterator = PointersToFunctions.find(identifier);
            if(tempFuncIterator != PointersToFunctions.end())
            {
                if(tempFuncIterator->second.StaticFunc != NULL)
                {
                    PointerToStaticFunction RunThisFunction = tempFuncIterator->second.StaticFunc;
                    (Game->*RunThisFunction)();
                }
                if(tempFuncIterator->second.ValueFunc != NULL)
                {
                    //check for invalid or unassigned value arguments
                    if(valueforvaluefunc != 0)
                    {
                        PointerToValueFunction RunThisFunction = tempFuncIterator->second.ValueFunc;
                        (Game->*RunThisFunction)(valueforvaluefunc);
                    }
                    else
                    {
                        SDL_Rect temploc;
                        RecentMessagesOutput.push_back(TextData("Invalid value for function", temploc, ErrorTextColor, 20));
                    }

                }
            }

            //unique cases that trigger internal console functions
            if(identifier == "list" || identifier == "help")
            {
                DisplayUploadedFunctions();
            }

            if(identifier == "close")
            {
                ToggleConsole();
            }

        }

        //limit storage to 10 lines
        int sizeoftext = RecentTextInput.size();
        if(sizeoftext > 10)
        {
            RecentTextInput.pop_back();
        }

        //clear the text on the input line
        CurrentTextInput = "";

        //return to the "-1" input slot
        PreviousInputTextTrackingNumber = -1;
    }

    //output stored messages to console window
    int sizeofoutputtext = RecentMessagesOutput.size();
    SDL_Rect outputlineloc = OutputLocation;
    if(sizeofoutputtext > 0)
    {
        //limit message storage to 10 lines
        if(sizeofoutputtext > 10)
        {
            RecentMessagesOutput.pop_back();
        }
        //send text to renderer for placement on screen
        for(int i = 0; i < sizeofoutputtext; i++)
        {
            //adjust so that each line of text is on a separate line
            outputlineloc.y = OutputLocation.y - (i * 20); ///20 will eventually be replaced with fontSize
            RecentMessagesOutput[i].displayLocation = outputlineloc;
            Rendering->AddOnScreenText(RecentMessagesOutput[i]);
        }

    }

    //send input text to renderer for placement on screen
    Rendering->AddOnScreenText(currentinput, InputLocation, InputTextColor, 20);

}

...



/*****************************************************
LIGHTING ENGINE
******************************************************/

...

void LightingEngine::Create3AnglesPerPoint(HighPrecisionPoint origin)
{
    double offset = 0.00000001;
    int sizeofverts = Vertices.size();
    HighPrecisionPoint temporigin;

    temporigin.x = origin.x;
    temporigin.y = origin.y;
    // 3 Angles per origin co-ordinates
    for(int iverts = 0; iverts < sizeofverts; iverts++)
    {
        HighPrecisionPoint tempdest = Vertices[iverts];
        double xdiff = (tempdest.x - temporigin.x);
        double ydiff = (tempdest.y - temporigin.y);
        double angle1 = atan2(ydiff, xdiff);
        double angle2 = angle1 + offset;
        double angle3 = angle1 - offset;
        
        //angles pushed in this order to maintain an orderly clockwise sequence
        Angles.push_back(angle3);
        Angles.push_back(angle1);
        Angles.push_back(angle2);

    }

    Vertices.clear();
}

...

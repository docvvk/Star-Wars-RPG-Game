    // Defining global variables
    var attack;
    var defend;
    var attackChar;
    var attackerHP;
    var attackerAP;
    var attackerCAP;
    var attackerFN;
    var defendChar;
    var defenderHP;
    var defenderAP;
    var defenderCAP;
    var defenderFN;
    var name;
    var yourChar;
    var yourDef;
    var myChar = "";
    var myDef = "";

    //Defining sounds

    var sound1 = new Audio (src='assets/sounds/force.mp3');
    var sound2 = new Audio (src='assets/sounds/blaster-firing.mp3');
    var sound3 = new Audio (src='assets/sounds/saberon.mp3');
    var sound4 = new Audio (src='assets/sounds/saberclash.mp3');
    var sound5 = new Audio (src='assets/sounds/set-for-stun.mp3');
    var sound6 = new Audio (src='assets/sounds/saberclash5.mp3');
    var sound7 = new Audio (src='assets/sounds/battle-of-the-heroes.mp3');
    var sound8 = new Audio (src='assets/sounds/swing1.mp3');
    var sound9 = new Audio (src='assets/sounds/swing2.mp3');


    //Defining functions

    function reset() {                  // Reset game to default settings

        // sound7.play();
        
        $("#picRow").show();            // Showing all characters available to play
        $(".restart").hide();
        $(".attackButton").show();

        myChar = "";
        myDef = "";

        // Reset health points
        characters.ObiWan.healthPoints = 120;
        characters.LukeSky.healthPoints = 100;
        characters.DarSid.healthPoints = 150;
        characters.ReyQuer.healthPoints = 180;

        // Reset Attack Power
        characters.ObiWan.attackPower = 8;
        characters.LukeSky.attackPower = 10;
        characters.DarSid.attackPower = 10;
        characters.ReyQuer.attackPower = 12;

        // Delete all text in game
        $(".youAttacked").empty();
        $(".attackedBack").empty();
        $(".youDefeated").empty();
        $(".youWon").empty();
        $(".youLose").empty();
        $(".noEnemy").empty();

        // Adding full name for each character
        $(".nameo").html(characters.ObiWan.fullName);
        $(".namel").html(characters.LukeSky.fullName);
        $(".nameds").html(characters.DarSid.fullName);
        $(".namerq").html(characters.ReyQuer.fullName);

        // Adding image for each character
        $("#darthS").appendTo("#picRow");
        $("#reyQ").appendTo("#picRow");
        $("#luke").appendTo("#picRow");
        $("#obi").appendTo("#picRow");

        // Adding health points for each character
        $(".ob1hp").html(characters.ObiWan.healthPoints);
        $(".lukehp").html(characters.LukeSky.healthPoints);
        $(".darthshp").html(characters.DarSid.healthPoints);
        $(".reyhp").html(characters.ReyQuer.healthPoints);

        // Reset border colors. 
        $(".firstRow").css({"background-color": "white", "outline-color": "rgb(22, 219, 216", 
        "border-width": "1px", "outline-style": "solid", "border-color": "white", "outline-width": "2px"});
    };
    
    // Array to hold each character stats
    var characters = {
        
        ObiWan: {
                name: "ObiWan",
                visual: 'assets/images/Ovi-Van-Kenobi.jpg',
                healthPoints: 120,
                attackPower: 8,
                fullName: "Obi Kenobi",
                counterAttackPower: 24
                },
        
        LukeSky: {
                name: "LukeSky",
                visual: 'assets/images/Luke-Skywalker.jpg',
                healthPoints: 100,
                attackPower: 10,
                fullName: "Luke Skywalker",
                counterAttackPower: 5
                },
        
        DarSid: {
                name: "DarSid",
                visual: 'assets/images/Darth-Wader.jpg',
                healthPoints: 150,
                attackPower: 10,
                fullName: "Darth Sideous",
                counterAttackPower: 20
                },
        
        ReyQuer: {
                name: "ReyQuer",
                healthPoints: 180,
                visual: 'assets/images/Rey_Quer.jpg',
                attackPower: 12,
                fullName: "Rey Quer",
                counterAttackPower: 25
                } 
    }
$(document).ready(function() {

    reset();

    // Defining on click functions

    // When player clicks on any of the characters, that character moves into "Your Character" row
    // and the other three move into "Enemies available to attack" row
    $(".firstRow").click(function() {
        if (myChar == "") {
            $(this).appendTo("#yourChar");         // appends the clicked character to "Your Character" row
            myChar = $(this);
            yourChar = $(myChar).attr("value");
        }

        // All the stats of clicked character are transferred to your character
        
        if (yourChar == characters.ObiWan.name) {
            attackerHP = characters.ObiWan.healthPoints;
            attackerAP = characters.ObiWan.attackPower;
            attackerCAP = characters.ObiWan.counterAttackPower;
            attackerFN = characters.ObiWan.fullName;
            attack = characters.ObiWan;
        }

        else if (yourChar == characters.LukeSky.name) {
            attackerHP = characters.LukeSky.healthPoints;
            attackerAP = characters.LukeSky.attackPower;
            attackerCAP = characters.LukeSky.counterAttackPower;
            attackerFN = characters.LukeSky.fullName;
            attack = characters.LukeSky;
        }

        else if (yourChar == characters.DarSid.name) {
            attackerHP = characters.DarSid.healthPoints;
            attackerAP = characters.DarSid.attackPower;
            attackerCAP = characters.DarSid.counterAttackPower;
            attackerFN = characters.DarSid.fullName;
            attack = characters.DarSid;
        }

        else if (yourChar == characters.ReyQuer.name) {
            attackerHP = characters.ReyQuer.healthPoints;
            attackerAP = characters.ReyQuer.attackPower;
            attackerCAP = characters.ReyQuer.counterAttackPower;
            attackerFN = characters.ReyQuer.fullName;
            attack = characters.ReyQuer;
        }

        // Cloning remaining three characters to "Enemies available to attack" row

        for (var i = 0; i < 4; i++) {
            $("._" + [i]).not(myChar).appendTo("#enemies" + [i]);
        
        // Changing background for characters
            $("._" + [i]).not(myChar).css({"background-color": "skyblue", "outline-color": "black", "border-width": "3px", "outline-style": "solid",
            "border-color": "black", "outline-width": "1px"});
        }

        // Clearing images from top characters row after moving them

        $("#picRow").hide();
    });

    // When player clicks on any character in "Enemies available to attack" row, that character moves to
    // "Defender" position, rest remain in "Enemies available to attack" row

    $(".move").click(function () { 
        $(this).appendTo("#defender");
        myDef = $(this);
        yourDef = $(myDef).children().attr("value")
        $(".youDefeated").empty();

        // All the stats of clicked character are transferred to your defender

        if (yourDef == characters.ObiWan.name) {
            defenderHP = characters.ObiWan.healthPoints;
            defenderAP = characters.ObiWan.attackPower;
            defenderCAP = characters.ObiWan.counterAttackPower;
            defenderFN = characters.ObiWan.fullName;
            defend = characters.ObiWan;
        }
        else if (yourDef == characters.LukeSky.name) {
            defenderHP = characters.LukeSky.healthPoints;
            defenderAP = characters.LukeSky.attackPower;
            defenderCAP = characters.LukeSky.counterAttackPower;
            defenderFN = characters.LukeSky.fullName;
            defend = characters.LukeSky;
        }
        else if (yourDef == characters.DarSid.name) {
            defenderHP = characters.DarSid.healthPoints;
            defenderAP = characters.DarSid.attackPower;
            defenderCAP = characters.DarSid.counterAttackPower;
            defenderFN = characters.DarSid.fullName;
            defend = characters.DarSid;
        }
        else if (yourDef == characters.ReyQuer.name) {
            defenderHP = characters.ReyQuer.healthPoints;
            defenderAP = characters.ReyQuer.attackPower;
            defenderCAP = characters.ReyQuer.counterAttackPower;
            defenderFN = characters.ReyQuer.fullName;
            defend = characters.ReyQuer;
        }
     });

    // When user clicks attack button, your character's health points
    // going down = counter attack points of defender character
    $(".attackButton").on("click", function() {    // When the button is clicked

        sound2.play();

        // If no one in defender row, game says "No enemy here"
        if ($("#defender").children().length == 0) {
            $(".noEnemy").html("No enemy here!");
        }

        // If both players health points are not 0, attacker hp -= defender CAP
        if (!(attackerHP < 1) || !(defenderHP < 1)) {
            attackerHP = (attackerHP - defenderCAP);

        // Writing your character's new hp to html
        $("." + yourChar).html(attackerHP);

        // Writing the text "You attacked the player for 10 demage"
        $(".youAttacked").html("You attacked " + defenderFN + " for " + attackerAP + " demage.");

        // If both players health points are not 0, defender hp -= attacked AP
        defenderHP = (defenderHP - attackerAP);

        // Writing the text "The player attacked back for 10 demage"
        $(".attackedBack").html(defenderFN + " attacked you back for " + defenderCAP + " demage.");

        // Writing the defender's new hp to html
        $("." + yourDef).html(defenderHP);

        }

        // If your character defeats the defender
        if (defenderHP <= 0) {

            // Clear the attack text and add defeated text
            $(".youattacked").empty();
            $(".attackedBack").empty();
            $(".youDefeated").html("You have defeated " + defenderFN + ", you can choose another enemy to continue fight.");

            // Remove character from defender row
            $("#defender").empty();

            // Your character's attack power goes up by 10
            attackerAP = (attackerAP + 10);

            // Redefining "YourCharacter"'s attack power to equal the new value. 
            attack.attackPower = attackerAP;
        }

        // If all the enemies have been defeated and the player still has health points, Player wins.
        if($(".move").children().length == 0) {

            sound1.play();


            // Clear all the text from screen and let user know about the win.
            $(".youAttacked").empty();
            $(".attackedBack").empty();
            $(".youDefeated").empty();
            $(".noEnemy").empty();
            // $(".youWon").html("You Won !! Game Over !!");
            
            // Show the restart button
            $(".restart").show();

            // Click restart button to start the game again
            $(".restart").on("click", function () { 
                location.reload(true);
             });
        }

        // If ypur character hp = 0, you loose.
        if (attackerHP <= 0) {

            // Show the restart button
            $(".restart").show();
            
            // Hide the attack button
            $(".attackButton").hide();

            // Clear all the text from screen and let user know about the loss.
            $(".youAttacked").empty();
            $(".attackedBack").empty();
            $(".youDefeated").empty();
            $(".youWon").empty();


            $(".youLose").html("You've been defeated...GAME OVER !!");

            // Click restart button to start the game again
            $(".restart").on("click", function () {
                // sound1.play(); 
                location.reload(true);
             });
        }
    });
});
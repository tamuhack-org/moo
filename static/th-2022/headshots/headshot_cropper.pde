import java.io.*;

// Settings
String input_folder_path = "in/";
String output_folder_path = "out/";
int upper_bound = 500;

void setup ()
{
  File in_folder = new File(input_folder_path);
  
  for (File pic : in_folder.listFiles())
  {
    if (pic.getName().endsWith(".png") || pic.getName().endsWith(".jpg"))
    {
      println("Cropping " + pic.getName() + "...");
      PImage image = loadImage(pic.getAbsolutePath());
      PImage croppedImage = createImage(image.width, image.width, RGB);
      croppedImage.copy(image, 0, 500, image.width, image.width, 0, 0, image.width, image.width);
      croppedImage.resize(360, 0);
      croppedImage.save(output_folder_path + pic.getName());
    }
  }
  println("Done!");
}
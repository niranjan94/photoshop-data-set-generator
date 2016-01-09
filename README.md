### Steps to use

1. Extract ``IDCardGenerator.zip``.
2. Run ``IDCardGenerator.exe``.
3. Open Google Chrome (recommended) and goto ``http://localhost:8888``
4. Fill in the details. Attach the photo. And press the ``Add next person`` button. 
5. Keep adding people till a batch is over. Then press on ``Generate Next Batch`` button. 
6. Navigate to folder displayed on the screen on the lower left corner.
7. Open photoshop. Open the file ``ID_Card_To_Use_with_generator.psd``. 
8. Goto ``File -> Import -> Variable Data Sets..``
9. Press select file and select the ``csv`` file that is inside the folder shown in ``step 6``.
10. tick ``Use First column for data set names``
11. tick ``Replace existing Data sets``
12. Goto ``File -> Export -> Data Sets as Files..``
13. Click on ``Select Folder`` and select where you want to save the individual ID card psd files.  And press OK. The individual PSD files will be generated.
14. **If you want to convert the PSD files to JPG**:
14. Goto ``File -> Scripts -> Image Processor``
15. In (1) select the folder you had used in ``step 13``
16. In (2) Select where you want to save the images
17. In (3) Tick ``Save as JPEG``, Set quality as any number from 8 to 10
18. Press Run.
19. The generated image files will be located in the folder you selected in ``step 17``


/*
 * *****
 * MODIFIED FOR "ESCAPE THE SCAM" - UEH
 * 3 LEVELS TOTAL: 4 QUESTIONS EACH (Q0-Q11)
 * MAPS EXTENDED FOR LONGER GAMEPLAY
 * *****
 */

var definedLevels = [
{ // Level 0 (ID=0) - LEVEL 1: Nhận diện tin nhắn & đường link lừa đảo (Q0-Q3)
    width: 260, // Kích thước mở rộng
    height: 15,
    id: 0,
    background: 1,
    data:
    [
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 0
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 1
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 2
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 3
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 4
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top' , 'soil'], // 5 - Mario Start
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , 'multiple_coinbox' , '' , '' , '' , 'grass_top' , 'soil'], // 6
    // Thêm khoảng trống nhỏ
    ...Array(15).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 7 - 21
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 22: Q0 (thay mushroombox)
    // Thêm khoảng trống lớn
    ...Array(15).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 23 - 37
    ['' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 38: Q1
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 39
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 40 - 69
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 70: Q2 (thay coinbox)
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 71
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 72 - 101
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 102: Q3
    ['' , '' , '' , '' , 'ballmonster' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 103
    // Thêm các cột trống để map dài ra (Col 104 -> 258)
    ...Array(155).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']),
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 259 (last column)
    ]
}
,
{ // Level 1 (ID=1) - LEVEL 2: Lừa đảo tài chính & đầu tư (Q4-Q7)
    width: 260, // Kích thước mở rộng
    height: 15,
    id: 1,
    background: 1,
    data:
    [
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 0
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 1
    ['','','','','','','','','','','','','mario','grass_top','planted_soil_right'], // 2: Mario Start
    // Thêm khoảng trống
    ...Array(10).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 3 - 12
    ['','','','','','','','','questionbox','','','','','grass_top','soil'], // 13: Q4 (thay mushroombox)
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 14 - 43
    ['','','','','','','','','questionbox','','','bush_right','grass_top','soil','soil'], // 44: Q5
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 45 - 74
    ['','','','','','','','','questionbox','','','bush_left','grass_top','soil','soil'], // 75: Q6 (thay starbox)
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 76 - 105
    ['','','','','','','','','questionbox','','','greenturtle','grass_top','soil','planted_soil_right'], // 106: Q7 (thay coinbox)
    ['','','','','','','','','','','','','grass_top','soil','soil'], // 107
    // Thêm các cột trống (Col 108 -> 258)
    ...Array(152).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']),
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'] // Col 259 (last column)
    ]
}
,
{ // Level 2 (ID=2) - LEVEL 3: Bảo mật cá nhân & ứng phó tống tiền (Q8-Q11)
    width: 260, // Kích thước mở rộng
    height: 15,
    id: 2,
    background: 8, // Nền hang động
    data:
    [
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 0
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top'], // 1: Mario Start
    // Thêm khoảng trống nhỏ
    ...Array(10).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 2 - 11
    ['' , 'brown_block' , 'coin' , 'brown_block' , '' , 'multiple_coinbox' , '' , 'coinbox' , '' , '' , 'questionbox' , '' , 'grass_top' , 'soil' , 'soil'], // 12: Q8 (thay mushroombox)
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 13 - 32
    ['' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 33: Q9
    // Thêm khoảng trống lớn
    ...Array(25).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 34 - 58
    ['' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_left' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 59: Q10 (thay starbox)
    // Thêm khoảng trống lớn
    ...Array(25).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 60 - 84
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top'], // 85: Q11
    // Thêm các cột trống cuối cùng (Col 86 -> 258)
    ...Array(174).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']),
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 259 (last column)
    ]
}
];
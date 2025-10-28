/*
 * *****
 * WRITTEN BY FLORIAN RAPPL, 2012.
 * florian-rappl.de
 * mail@florian-rappl.de
 * MODIFIED TO 3 LEVELS, 4 QUESTIONS EACH + CHECKPOINTS
 * *****
 */

var definedLevels = [
{ // Level 0 (ID=0) - LEVEL 1: Nhận diện tin nhắn & đường link lừa đảo (Q0-Q3)
    width: 260, // Tăng chiều rộng
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
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_left'], // 7
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_middle'], // 8
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'planted_soil_right'], // 9
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 10
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 11
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 12
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 13
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 14
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 15
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_left' , 'grass_top' , 'soil'], // 16
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle' , 'grass_top' , 'soil'], // 17
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_middle_right' , 'grass_top' , 'soil'], // 18
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'bush_right' , 'grass_top' , 'soil'], // 19
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 20
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 21
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 22: Q0 
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 23
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 24
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'ballmonster' , 'grass_top' , 'soil'], // 25
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 26
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 27
    // Thêm khoảng trống lớn
    ...Array(10).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 28 - 37
    ['' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 38: Q1
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'brown_block' , 'brown_block' , 'brown_block' , 'grass_top' , 'soil'], // 39
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 40 - 59
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil'], // 60
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 61
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 62 - 81
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 82: Q2
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 83 - 102
    ['' , '' , '' , '' , '' , '' , '' , 'pipe_top_left' , 'pipe_left' , 'pipe_left' , 'pipe_left_grass' , 'pipe_left_soil' , 'pipe_left_soil' , 'pipe_left_soil' , 'pipe_left_soil'], // 103
    ['' , '' , '' , '' , '' , '' , '' , 'pipe_top_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right' , 'pipe_right_grass' , 'pipe_right_soil'], // 104
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 105
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 106
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil'], // 107: Q3
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 108
    ['' , '' , '' , '' , '' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 109
    ['' , '' , '' , '' , 'ballmonster' , 'brown_block' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil'], // 110
    // Thêm các cột trống để map dài ra (Col 111 -> 258)
    ...Array(148).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']),
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 259 (last column)
    ]
}
,
{ // Level 1 (ID=1) - LEVEL 2: Lừa đảo tài chính & đầu tư (Q4-Q7)
    width: 260, // Tăng chiều rộng
    height: 15,
    id: 1,
    background: 1,
    data:
    [
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 0
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'], // 1
    ['','','','','','','','','','','','','mario','grass_top','planted_soil_right'], // 2: Mario Start
    ['','','','','','','','','','','','','','grass_top','soil'], // 3
    // Giữ nguyên 3 cột ban đầu và thêm Q4
    ['','','','','','','','','coinbox','','','','','grass_top','soil'], // 4
    ['','','','','','','','','questionbox','','','','','grass_top','soil'], // 5: Q4
    ['','','','','','','','','coinbox','','','','bush_left','grass_top','soil'], // 6
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 7 - 36
    ['','','','','','','','','','','','','','grass_top_left','grass_left'], // 37
    ['','','','','','','','','bush_left','grass_top','soil','soil','soil','soil','soil'], // 38
    ['','','','','','','','','bush_right','grass_top','soil','planted_soil_left','soil','soil','soil'], // 39
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 40 - 59
    ['','','','','','','','','questionbox','','','bush_right','grass_top','soil','soil'], // 60: Q5
    // Thêm khoảng trống lớn
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 61 - 80
    ['','','','','','','','','questionbox','','','bush_left','grass_top','soil','soil'], // 81: Q6
    // Thêm khoảng trống lớn
    ...Array(30).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']), // Col 82 - 111
    ['','','','','','','','','questionbox','','','greenturtle','grass_top','soil','planted_soil_right'], // 112: Q7
    ['','','','','','','','','','','','','grass_top','soil','soil'], // 113
    // Thêm các cột trống (Col 114 -> 258)
    ...Array(145).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil']),
    ['','','','','','','','','','','','','','grass_top','planted_soil_middle'] // Col 259 (last column)
    ]
}
,
{ // Level 2 (ID=2) - LEVEL 3: Bảo mật cá nhân & ứng phó tống tiền (Q8-Q11)
    width: 260, // Tăng chiều rộng
    height: 15,
    id: 2,
    background: 8, // Nền hang động
    data:
    [
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 0
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'mario' , 'grass_top'], // 1: Mario Start
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'], // 2
    // Thêm khoảng trống
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 3 - 22
    ['' , 'brown_block' , 'coin' , 'brown_block' , '' , 'multiple_coinbox' , '' , 'coinbox' , '' , '' , 'questionbox' , '' , 'grass_top' , 'soil' , 'soil'], // 23: Q8
    // Thêm khoảng trống
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 24 - 43
    ['' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 44: Q9
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top' , 'soil' , 'soil'], // 45
    // Thêm khoảng trống
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 46 - 65
    ['' , '' , 'questionbox' , '' , '' , '' , 'grass_top' , 'soil' , 'soil' , 'planted_soil_left' , 'soil' , 'soil' , 'soil' , 'soil' , 'soil'], // 66: Q10
    // Thêm khoảng trống
    ...Array(20).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']), // Col 67 - 86
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'questionbox' , '' , '' , '' , 'grass_top'], // 87: Q11
    // Thêm các cột trống cuối cùng (Col 88 -> 258)
    ...Array(171).fill(['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top']),
    ['' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , '' , 'grass_top'] // Col 259 (last column)
    ]
}
];
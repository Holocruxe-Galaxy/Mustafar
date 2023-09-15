import React, { useState, useRef, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { useForm, Controller, useFieldArray } from 'react-hook-form'

// ** Material UI
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Modal,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  Switch,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { makeStyles } from '@mui/styles'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'

// ** Redux Toolkit
import { deleteDiary, editEntrie, editEntrieWithFile } from 'src/store/apps/diary'

// ** Emoji Picker
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

// ** Utils
import emotions from 'src/@core/utils/emotions'
import RocketFav from 'src/@core/icons/diary/RocketFav'
import EditIcon from 'src/@core/icons/diary/EditIcon'

//import ArtIcon from 'src/@core/icons/diary/ArtIcon'
import DeleteIcon from 'src/@core/icons/diary/DeleteIcon'
import YesButton from 'src/@core/icons/diary/YesButton'
import NoButton from 'src/@core/icons/diary/NoButton'

import IconEmojiButton from 'src/@core/icons/diary/IconEmojiButton'
import UploadButton from 'src/@core/icons/diary/UploadButton'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props

  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="30" viewBox="0 0 36 36">${`<path d="M0 19.4442L4.72328 14.7903L12.765 13.3652L11.9701 17.574L1.09844 20.9155L0.396016 20.612L0 19.4442Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/>`}${`<path d="M5.54203 15.9841L0.414062 20.6438L4.18633 22.4822L9.91266 19.5598V18.181L11.0834 15.0244L5.54203 15.9841ZM17.6769 24.1906L15.1996 25.2659L12.8611 30.2233C12.8611 30.2233 14.9192 34.7818 15.0117 34.7818C15.1042 34.7818 16.2749 34.8743 16.2749 34.8743L20.4374 30.2204L21.4896 22.2712L17.6769 24.1906Z" fill="${encodeURIComponent(
          '#46476B'
        )}"/>`}${`<path d="M15.2428 27.8589C15.2428 27.8589 16.6216 27.5785 17.6045 27.1102C18.5873 26.6419 19.8013 25.9424 19.8013 25.9424L19.3562 29.8245L15.0058 34.7761C15.0058 34.7761 14.8352 34.5651 14.1126 32.9926C13.5373 31.7381 13.3379 31.29 13.3379 31.29L15.2428 27.8589Z" fill="${encodeURIComponent(
          '#46476B'
        )}"/>`}${`<path d="M13.3926 25.0842C13.3926 25.0842 14.8495 26.041 17.292 25.2201C20.6307 24.0985 23.0791 21.5895 26.1113 18.4213C29.0366 15.363 31.4908 11.5677 31.4908 11.5677L29.7709 5.80664L13.3926 25.0842Z" fill="${encodeURIComponent(
          '#437687'
        )}"/>`}${`<path d="M23.2837 3.375C23.2837 3.375 20.5029 4.98797 16.5167 8.76023C12.9237 12.1596 10.2614 15.2352 9.6168 17.8513C9.07914 20.0423 9.36531 21.372 10.588 22.8087C11.8802 24.3291 13.3948 25.0836 13.3948 25.0836C13.3948 25.0836 14.5338 25.1009 19.2859 21.4443C25.2146 16.88 29.9639 9.23719 29.9639 9.23719L23.2837 3.375Z" fill="${encodeURIComponent(
          '#8DAFBF'
        )}"/>`}${`<path d="M8.03953 22.026C8.03953 22.026 6.38031 21.8873 4.56211 24.1853C2.90289 26.2839 2.12531 29.7006 1.82469 30.5794C1.52406 31.4581 0.804296 31.6374 1.04422 32.0391C1.28414 32.4409 2.32187 32.4178 3.60242 32.2588C4.88297 32.0998 5.98141 31.6981 5.98141 31.6981C5.98141 31.6981 5.92648 31.8368 5.74148 32.1374C5.675 32.2444 5.44375 32.3976 5.46109 32.5566C5.50156 32.9352 8.74484 32.9439 11.3348 30.2788C14.133 27.4026 12.7744 25.0438 12.7744 25.0438L8.03953 22.026Z" fill="${encodeURIComponent(
          '#F836F4'
        )}"/>`}${`<path d="M14.9679 2.1465C14.9679 2.1465 15.3205 1.14057 15.5287 1.129C15.7397 1.11744 16.0432 2.13494 16.0432 2.13494C16.0432 2.13494 17.0867 2.1465 17.1561 2.29971C17.2457 2.49627 16.4883 3.15533 16.4883 3.15533C16.4883 3.15533 16.7341 4.13814 16.6184 4.25666C16.4883 4.38674 15.5894 3.86932 15.5894 3.86932C15.5894 3.86932 14.6644 4.51393 14.4649 4.3376C14.2915 4.18439 14.6528 3.14377 14.6528 3.14377C14.6528 3.14377 13.7856 2.51072 13.8319 2.33439C13.8983 2.0858 14.9679 2.1465 14.9679 2.1465ZM26.9524 26.2659C27.3022 26.4596 27.7416 26.3497 27.9034 25.9768C28.0508 25.6444 27.7791 25.2484 27.5334 25.1414C27.2877 25.0345 26.857 25.1761 26.7009 25.4565C26.5477 25.734 26.7414 26.1503 26.9524 26.2659ZM31.9185 17.7414C31.7191 17.4321 31.2883 17.331 31.008 17.5795C30.7362 17.8224 30.8027 18.2039 30.9559 18.3976C31.1091 18.5913 31.5196 18.6635 31.7682 18.5046C32.0168 18.3456 32.0399 17.9264 31.9185 17.7414Z" fill="${encodeURIComponent(
          'white'
        )}"/>`}${`<path opacity="0.5" d="M10.7682 9.01528C10.5254 9.2841 10.6034 9.68301 10.8289 9.83043C11.0544 9.97785 11.3926 9.9634 11.5573 9.76106C11.7047 9.57895 11.7221 9.21473 11.4966 8.98926C11.3001 8.79559 10.9243 8.84184 10.7682 9.01528Z" fill="white"/>`}${`<path d="M4.41897 9.39041C4.09811 9.71127 4.08365 10.2258 4.44209 10.5206C4.76006 10.7837 5.27748 10.6131 5.47115 10.3761C5.66483 10.1391 5.6417 9.62455 5.38443 9.37018C5.12717 9.11291 4.61553 9.19674 4.41897 9.39041Z" fill="white"/>`}${`<path d="M24.7421 9.94655C23.132 8.46366 20.8918 8.86257 19.7876 10.1807C18.6544 11.5393 18.7383 13.6148 20.0766 14.8635C21.2936 15.9966 23.5569 16.2539 24.9213 14.6641C26.1354 13.2534 26.0602 11.1577 24.7421 9.94655Z" fill="${encodeURIComponent(
          '#E1E1E1'
        )}"/>`}${`<path d="M20.6217 10.7034C19.6649 11.6429 19.7169 13.5044 20.8558 14.3543C21.8502 15.0972 23.2608 15.0596 24.1454 14.1548C25.0299 13.2501 25.0299 11.6053 24.2003 10.7555C23.2464 9.78132 21.7173 9.62812 20.6217 10.7034Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/>`}${`<path d="M10.4186 18.8456C10.7944 19.204 11.3638 18.8282 11.7367 17.9495C12.1125 17.0707 12.1067 16.5793 11.8176 16.3712C11.4592 16.1111 10.858 16.6805 10.5949 17.1864C10.3058 17.7471 10.1353 18.5739 10.4186 18.8456ZM23.4669 4.52832C23.4669 4.52832 21.2671 6.10949 18.9199 8.26012C16.7664 10.2344 15.3384 11.778 15.1419 12.1364C14.9337 12.5209 14.9308 13.0643 15.0927 13.3418C15.2546 13.6193 15.613 13.7639 15.9397 13.5211C16.2663 13.2754 18.5933 10.7027 20.6947 8.86426C22.617 7.18191 24.0999 6.11527 24.0999 6.11527C24.0999 6.11527 24.7012 5.05152 24.6029 4.80871C24.5046 4.56301 23.4669 4.52832 23.4669 4.52832Z" fill="${encodeURIComponent(
          '#B3E1EE'
        )}"/>`}${`<path d="M18.5645 21.9304L18.9662 20.6816L19.9722 20.8233C19.9722 20.8233 20.7382 21.1846 21.3019 21.4477C21.8655 21.7107 22.5911 21.9102 22.5911 21.9102L21.1602 23.1184C21.1602 23.1184 20.3798 22.8236 19.8103 22.575C19.1686 22.2946 18.5645 21.9304 18.5645 21.9304Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/>`}${`<path d="M8.53839 23.3643C8.53839 23.3643 6.7491 23.4596 5.2691 25.7577C3.7891 28.0557 3.10113 30.718 3.24277 30.8972C3.38152 31.0764 6.13918 30.0792 6.80113 30.2786C7.25496 30.4174 7.02082 30.877 7.14222 30.9984C7.24339 31.0996 8.44011 31.2701 10.3768 29.1715C12.3164 27.0729 11.8568 24.1245 11.8568 24.1245L8.53839 23.3643Z" fill="${encodeURIComponent(
          '#FBF0B4'
        )}"/>`}${`<path d="M9.4184 20.2275C9.4184 20.2275 8.51942 21.0282 8.19856 21.4879C7.8777 21.9475 7.8777 21.9879 7.89793 22.1267C7.91817 22.2654 8.25059 23.7888 9.6352 25.1243C11.3349 26.7632 12.8525 26.9829 13.0722 26.9829C13.2918 26.9829 14.7516 25.3439 14.7516 25.3439L9.4184 20.2275Z" fill="${encodeURIComponent(
          '#858585'
        )}"/>`}${`<path d="M13.3626 20.9364C13.3626 20.9364 15.1519 19.1211 15.3485 19.3176C15.5451 19.5142 15.519 20.6155 14.6634 21.8411C13.8049 23.0668 11.9173 25.2492 10.4229 26.7205C8.94866 28.1687 6.8703 29.825 6.67373 29.7961C6.52053 29.773 5.89905 29.4637 5.65045 29.1631C5.40764 28.8654 6.13319 27.4576 6.42514 26.9922C6.71998 26.5268 13.3626 20.9364 13.3626 20.9364Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/>`}${`<path d="M5.04749 28.151C5.02437 28.5672 5.6603 29.1742 5.6603 29.1742L15.3497 19.3201C15.3497 19.3201 14.8959 18.8085 13.5604 19.6381C12.2134 20.4764 11.034 21.4823 9.29382 23.1675C6.86858 25.5205 5.07062 27.7347 5.04749 28.151Z" fill="${encodeURIComponent(
          '#2B2C4B'
        )}"/>`}${`<path d="M18.6149 21.9507C18.6149 21.9507 16.525 20.8841 15.1953 19.3665C12.6805 16.5019 12.1602 13.3569 12.1602 13.3569L13.4234 11.874C13.4234 11.874 13.7384 15.2156 16.4354 18.1033C18.1929 19.9851 20.0284 20.8465 20.0284 20.8465C20.0284 20.8465 19.6613 21.1558 19.2682 21.4564C19.0167 21.6501 18.6149 21.9507 18.6149 21.9507Z" fill="${encodeURIComponent(
          '#00FFED'
        )}"/>`}${`<path d="M29.0248 10.8043C29.0248 10.8043 26.6054 9.77232 24.8797 7.36443C23.1655 4.97388 23.3014 3.35802 23.3014 3.35802C23.3014 3.35802 24.7351 2.23357 27.9582 0.947239C30.1261 0.0829424 33.0775 -0.359323 34.0487 0.360442C35.02 1.08021 33.3839 4.6906 33.3839 4.6906L30.4036 10.4603L29.0248 10.8043Z" fill="${encodeURIComponent(
          '#46476B'
        )}"/>`}${`<path d="M23.4668 4.52833C23.4668 4.52833 25.0913 3.28248 26.8604 2.40662C28.5052 1.59146 30.1412 0.912163 30.4361 1.50185C30.7165 2.06263 28.8838 2.82576 27.2709 3.85482C25.6579 4.88388 24.1056 6.1124 24.1056 6.1124C24.1056 6.1124 23.8686 5.6788 23.7154 5.27701C23.6182 5.03243 23.5352 4.78246 23.4668 4.52833Z" fill="${encodeURIComponent(
          '#00FFED'
        )}"/>`}${`<path d="M31.4911 11.5676C31.4911 11.5676 32.7456 10.0558 33.9337 6.64777C35.5929 1.89559 34.1476 0.456055 34.1476 0.456055C34.1476 0.456055 33.6591 2.71652 31.9623 5.85863C30.6008 8.37637 28.9531 10.7727 28.9531 10.7727C28.9531 10.7727 29.8608 11.1803 30.3522 11.3219C30.9708 11.5011 31.4911 11.5676 31.4911 11.5676Z" fill="${encodeURIComponent(
          '#282831'
        )}"/> `}</svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#59C1BD' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#59C1BD' : '#59C1BD',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="30" viewBox="0 0 36 36">${`<path d="M0 19.4442L4.72328 14.7903L12.765 13.3652L11.9701 17.574L1.09844 20.9155L0.396016 20.612L0 19.4442Z" fill="${encodeURIComponent(
        '#2B2C4B'
      )}"/>`}${`<path d="M5.54203 15.9841L0.414062 20.6438L4.18633 22.4822L9.91266 19.5598V18.181L11.0834 15.0244L5.54203 15.9841ZM17.6769 24.1906L15.1996 25.2659L12.8611 30.2233C12.8611 30.2233 14.9192 34.7818 15.0117 34.7818C15.1042 34.7818 16.2749 34.8743 16.2749 34.8743L20.4374 30.2204L21.4896 22.2712L17.6769 24.1906Z" fill="${encodeURIComponent(
        '#46476B'
      )}"/>`}${`<path d="M15.2428 27.8589C15.2428 27.8589 16.6216 27.5785 17.6045 27.1102C18.5873 26.6419 19.8013 25.9424 19.8013 25.9424L19.3562 29.8245L15.0058 34.7761C15.0058 34.7761 14.8352 34.5651 14.1126 32.9926C13.5373 31.7381 13.3379 31.29 13.3379 31.29L15.2428 27.8589Z" fill="${encodeURIComponent(
        '#46476B'
      )}"/>`}${`<path d="M13.3926 25.0842C13.3926 25.0842 14.8495 26.041 17.292 25.2201C20.6307 24.0985 23.0791 21.5895 26.1113 18.4213C29.0366 15.363 31.4908 11.5677 31.4908 11.5677L29.7709 5.80664L13.3926 25.0842Z" fill="${encodeURIComponent(
        '#437687'
      )}"/>`}${`<path d="M23.2837 3.375C23.2837 3.375 20.5029 4.98797 16.5167 8.76023C12.9237 12.1596 10.2614 15.2352 9.6168 17.8513C9.07914 20.0423 9.36531 21.372 10.588 22.8087C11.8802 24.3291 13.3948 25.0836 13.3948 25.0836C13.3948 25.0836 14.5338 25.1009 19.2859 21.4443C25.2146 16.88 29.9639 9.23719 29.9639 9.23719L23.2837 3.375Z" fill="${encodeURIComponent(
        '#8DAFBF'
      )}"/>`}${`<path d="M8.03953 22.026C8.03953 22.026 6.38031 21.8873 4.56211 24.1853C2.90289 26.2839 2.12531 29.7006 1.82469 30.5794C1.52406 31.4581 0.804296 31.6374 1.04422 32.0391C1.28414 32.4409 2.32187 32.4178 3.60242 32.2588C4.88297 32.0998 5.98141 31.6981 5.98141 31.6981C5.98141 31.6981 5.92648 31.8368 5.74148 32.1374C5.675 32.2444 5.44375 32.3976 5.46109 32.5566C5.50156 32.9352 8.74484 32.9439 11.3348 30.2788C14.133 27.4026 12.7744 25.0438 12.7744 25.0438L8.03953 22.026Z" fill="${encodeURIComponent(
        '#F836F4'
      )}"/>`}${`<path d="M14.9679 2.1465C14.9679 2.1465 15.3205 1.14057 15.5287 1.129C15.7397 1.11744 16.0432 2.13494 16.0432 2.13494C16.0432 2.13494 17.0867 2.1465 17.1561 2.29971C17.2457 2.49627 16.4883 3.15533 16.4883 3.15533C16.4883 3.15533 16.7341 4.13814 16.6184 4.25666C16.4883 4.38674 15.5894 3.86932 15.5894 3.86932C15.5894 3.86932 14.6644 4.51393 14.4649 4.3376C14.2915 4.18439 14.6528 3.14377 14.6528 3.14377C14.6528 3.14377 13.7856 2.51072 13.8319 2.33439C13.8983 2.0858 14.9679 2.1465 14.9679 2.1465ZM26.9524 26.2659C27.3022 26.4596 27.7416 26.3497 27.9034 25.9768C28.0508 25.6444 27.7791 25.2484 27.5334 25.1414C27.2877 25.0345 26.857 25.1761 26.7009 25.4565C26.5477 25.734 26.7414 26.1503 26.9524 26.2659ZM31.9185 17.7414C31.7191 17.4321 31.2883 17.331 31.008 17.5795C30.7362 17.8224 30.8027 18.2039 30.9559 18.3976C31.1091 18.5913 31.5196 18.6635 31.7682 18.5046C32.0168 18.3456 32.0399 17.9264 31.9185 17.7414Z" fill="${encodeURIComponent(
        'white'
      )}"/>`}${`<path opacity="0.5" d="M10.7682 9.01528C10.5254 9.2841 10.6034 9.68301 10.8289 9.83043C11.0544 9.97785 11.3926 9.9634 11.5573 9.76106C11.7047 9.57895 11.7221 9.21473 11.4966 8.98926C11.3001 8.79559 10.9243 8.84184 10.7682 9.01528Z" fill="white"/>`}${`<path d="M4.41897 9.39041C4.09811 9.71127 4.08365 10.2258 4.44209 10.5206C4.76006 10.7837 5.27748 10.6131 5.47115 10.3761C5.66483 10.1391 5.6417 9.62455 5.38443 9.37018C5.12717 9.11291 4.61553 9.19674 4.41897 9.39041Z" fill="white"/>`}${`<path d="M24.7421 9.94655C23.132 8.46366 20.8918 8.86257 19.7876 10.1807C18.6544 11.5393 18.7383 13.6148 20.0766 14.8635C21.2936 15.9966 23.5569 16.2539 24.9213 14.6641C26.1354 13.2534 26.0602 11.1577 24.7421 9.94655Z" fill="${encodeURIComponent(
        '#E1E1E1'
      )}"/>`}${`<path d="M20.6217 10.7034C19.6649 11.6429 19.7169 13.5044 20.8558 14.3543C21.8502 15.0972 23.2608 15.0596 24.1454 14.1548C25.0299 13.2501 25.0299 11.6053 24.2003 10.7555C23.2464 9.78132 21.7173 9.62812 20.6217 10.7034Z" fill="${encodeURIComponent(
        '#2B2C4B'
      )}"/>`}${`<path d="M10.4186 18.8456C10.7944 19.204 11.3638 18.8282 11.7367 17.9495C12.1125 17.0707 12.1067 16.5793 11.8176 16.3712C11.4592 16.1111 10.858 16.6805 10.5949 17.1864C10.3058 17.7471 10.1353 18.5739 10.4186 18.8456ZM23.4669 4.52832C23.4669 4.52832 21.2671 6.10949 18.9199 8.26012C16.7664 10.2344 15.3384 11.778 15.1419 12.1364C14.9337 12.5209 14.9308 13.0643 15.0927 13.3418C15.2546 13.6193 15.613 13.7639 15.9397 13.5211C16.2663 13.2754 18.5933 10.7027 20.6947 8.86426C22.617 7.18191 24.0999 6.11527 24.0999 6.11527C24.0999 6.11527 24.7012 5.05152 24.6029 4.80871C24.5046 4.56301 23.4669 4.52832 23.4669 4.52832Z" fill="${encodeURIComponent(
        '#B3E1EE'
      )}"/>`}${`<path d="M18.5645 21.9304L18.9662 20.6816L19.9722 20.8233C19.9722 20.8233 20.7382 21.1846 21.3019 21.4477C21.8655 21.7107 22.5911 21.9102 22.5911 21.9102L21.1602 23.1184C21.1602 23.1184 20.3798 22.8236 19.8103 22.575C19.1686 22.2946 18.5645 21.9304 18.5645 21.9304Z" fill="${encodeURIComponent(
        '#2B2C4B'
      )}"/>`}${`<path d="M8.53839 23.3643C8.53839 23.3643 6.7491 23.4596 5.2691 25.7577C3.7891 28.0557 3.10113 30.718 3.24277 30.8972C3.38152 31.0764 6.13918 30.0792 6.80113 30.2786C7.25496 30.4174 7.02082 30.877 7.14222 30.9984C7.24339 31.0996 8.44011 31.2701 10.3768 29.1715C12.3164 27.0729 11.8568 24.1245 11.8568 24.1245L8.53839 23.3643Z" fill="${encodeURIComponent(
        '#FBF0B4'
      )}"/>`}${`<path d="M9.4184 20.2275C9.4184 20.2275 8.51942 21.0282 8.19856 21.4879C7.8777 21.9475 7.8777 21.9879 7.89793 22.1267C7.91817 22.2654 8.25059 23.7888 9.6352 25.1243C11.3349 26.7632 12.8525 26.9829 13.0722 26.9829C13.2918 26.9829 14.7516 25.3439 14.7516 25.3439L9.4184 20.2275Z" fill="${encodeURIComponent(
        '#858585'
      )}"/>`}${`<path d="M13.3626 20.9364C13.3626 20.9364 15.1519 19.1211 15.3485 19.3176C15.5451 19.5142 15.519 20.6155 14.6634 21.8411C13.8049 23.0668 11.9173 25.2492 10.4229 26.7205C8.94866 28.1687 6.8703 29.825 6.67373 29.7961C6.52053 29.773 5.89905 29.4637 5.65045 29.1631C5.40764 28.8654 6.13319 27.4576 6.42514 26.9922C6.71998 26.5268 13.3626 20.9364 13.3626 20.9364Z" fill="${encodeURIComponent(
        '#2B2C4B'
      )}"/>`}${`<path d="M5.04749 28.151C5.02437 28.5672 5.6603 29.1742 5.6603 29.1742L15.3497 19.3201C15.3497 19.3201 14.8959 18.8085 13.5604 19.6381C12.2134 20.4764 11.034 21.4823 9.29382 23.1675C6.86858 25.5205 5.07062 27.7347 5.04749 28.151Z" fill="${encodeURIComponent(
        '#2B2C4B'
      )}"/>`}${`<path d="M18.6149 21.9507C18.6149 21.9507 16.525 20.8841 15.1953 19.3665C12.6805 16.5019 12.1602 13.3569 12.1602 13.3569L13.4234 11.874C13.4234 11.874 13.7384 15.2156 16.4354 18.1033C18.1929 19.9851 20.0284 20.8465 20.0284 20.8465C20.0284 20.8465 19.6613 21.1558 19.2682 21.4564C19.0167 21.6501 18.6149 21.9507 18.6149 21.9507Z" fill="${encodeURIComponent(
        '#00FFED'
      )}"/>`}${`<path d="M29.0248 10.8043C29.0248 10.8043 26.6054 9.77232 24.8797 7.36443C23.1655 4.97388 23.3014 3.35802 23.3014 3.35802C23.3014 3.35802 24.7351 2.23357 27.9582 0.947239C30.1261 0.0829424 33.0775 -0.359323 34.0487 0.360442C35.02 1.08021 33.3839 4.6906 33.3839 4.6906L30.4036 10.4603L29.0248 10.8043Z" fill="${encodeURIComponent(
        '#46476B'
      )}"/>`}${`<path d="M23.4668 4.52833C23.4668 4.52833 25.0913 3.28248 26.8604 2.40662C28.5052 1.59146 30.1412 0.912163 30.4361 1.50185C30.7165 2.06263 28.8838 2.82576 27.2709 3.85482C25.6579 4.88388 24.1056 6.1124 24.1056 6.1124C24.1056 6.1124 23.8686 5.6788 23.7154 5.27701C23.6182 5.03243 23.5352 4.78246 23.4668 4.52833Z" fill="${encodeURIComponent(
        '#00FFED'
      )}"/>`}${`<path d="M31.4911 11.5676C31.4911 11.5676 32.7456 10.0558 33.9337 6.64777C35.5929 1.89559 34.1476 0.456055 34.1476 0.456055C34.1476 0.456055 33.6591 2.71652 31.9623 5.85863C30.6008 8.37637 28.9531 10.7727 28.9531 10.7727C28.9531 10.7727 29.8608 11.1803 30.3522 11.3219C30.9708 11.5011 31.4911 11.5676 31.4911 11.5676Z" fill="${encodeURIComponent(
        '#282831'
      )}"/> `}</svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const useStyles = makeStyles(() => ({
  picker: {
    position: 'absolute',
    top: 60,
    zIndex: 9999
  },
  iconButton: {
    width: '3rem',
    '&:hover': {
      backgroundColor: 'transparent',
      transition: 'none' // Set the background color to transparent on hover
    },
    '&:active': {
      backgroundColor: 'transparent',
      transition: 'none' // Set the background color to transparent when active (clicked)
    },
    '&.MuiIconButton-label': {
      transition: 'none' // Remove any transitions on the label (icon) to prevent animations
    }
  }
}))

const Entries = ({ id, props }: any) => {
  const dispatch = useDispatch<AppDispatch>()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [file, setFile] = useState<FormData>()

  const contentRef = useRef<HTMLInputElement>(props.content)
  const favoriteRef = useRef<HTMLElement>(props.favorite)
  const emojiRef = useRef<HTMLSelectElement>(props.emoji)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [isPickerVisible, setPickerVisible] = useState<boolean | null>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const handleOpenEdit = () => setOpenEdit(true)
  const handleCloseEdit = () => setOpenEdit(false)

  const { control, handleSubmit } = useForm({
    defaultValues: { content: props.content, emoji: props.emoji, photos: props.photos, favorite: props.favorite }
  })

  const { fields, remove } = useFieldArray({
    control,
    name: 'photos'
  })

  const onSubmit = (data: any) => {
    if (data.emoji === undefined) delete data.emoji

    if (!data.photos.length && !props.photos.length) delete data.photos
    if (file) {
      dispatch(editEntrieWithFile({ ...data, _id: id }))
    }

    dispatch(editEntrie({ ...data, _id: id }))
    handleCloseEdit()
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDelete = () => {
    dispatch(deleteDiary(id))
  }

  const handleEmojiSelect = (emoji: any) => {
    if (inputRef.current && isPickerVisible) {
      const cursorPosition = inputRef.current.selectionStart || 0
      const inputValue = inputRef.current.value
      const beforeCursor = inputValue.substring(0, cursorPosition)
      const afterCursor = inputValue.substring(cursorPosition)

      const newValue = beforeCursor + emoji.native + afterCursor
      inputRef.current.value = newValue
    }

    // TODO: ocultar picker cuando se clickea en otra parte de la pagina.

    setPickerVisible(!isPickerVisible)
  }

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const formData = new FormData()
    formData.append('photos', file as unknown as string)
    setFile(formData)
  }

  const style = {
    position: 'absolute' as const,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4
  }

  const styleModal = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const styleEdit = {
    position: 'absolute' as const,
    zIndex: 9999,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  }

  const classes = useStyles()

  return (
    <Card sx={{ backgroundColor: 'background.default' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#59c1bd' }}>R</Avatar>}
        action={
          <>
            {props.emoji && (
              <IconButton className={classes.iconButton} sx={{ paddingTop: 1 }}>
                {props.emoji}
              </IconButton>
            )}
            {props.favorite && (
              <Tooltip title='Tu publicación se encuentra dentro de tus favoritos' placement='top'>
                <IconButton className={classes.iconButton}>
                  <RocketFav />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title='Editar publicación' placement='top'>
              <IconButton className={classes.iconButton} onClick={handleOpenEdit} sx={{ marginTop: 1 }}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Modal open={openEdit} onClose={handleCloseEdit} sx={styleModal}>
              <Box sx={styleEdit} component='div'>
                <Typography sx={{ textAlign: 'left', mb: 5 }}>EDITAR</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <Controller
                      name='content'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          value={value}
                          multiline
                          fullWidth
                          minRows={4}
                          onChange={onChange}
                          inputRef={contentRef}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end' sx={{ display: 'flex' }}>
                                {!isPickerVisible ? (
                                  ''
                                ) : (
                                  <Card className={classes.picker}>
                                    <Picker
                                      data={data}
                                      perLine={6}
                                      maxFrequentRows={0}
                                      searchPosition='none'
                                      onEmojiSelect={handleEmojiSelect}
                                    />
                                  </Card>
                                )}
                                <IconButton onClick={() => setPickerVisible(!isPickerVisible)}>
                                  <IconEmojiButton />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        ></TextField>
                      )}
                    />
                    <Box
                      component='div'
                      sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
                    >
                      {props.emoji && (
                        <IconButton className={classes.iconButton} sx={{ pr: 5 }}>
                          {props.emoji}
                        </IconButton>
                      )}
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5, ml: 5 }} component='div'>
                        <Controller
                          name='favorite'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <MaterialUISwitch
                              checked={value}
                              onChange={onChange}
                              inputRef={favoriteRef}
                              sx={{ mr: 2 }}
                            />
                          )}
                        />
                        <input
                          type='file'
                          accept='image/*'
                          onChange={fileSelected}
                          style={{ display: 'none' }}
                          id='uploadButton'
                        ></input>
                        <label htmlFor='uploadButton' style={{ marginRight: 15 }}>
                          <UploadButton />
                        </label>
                        <Controller
                          name='emoji'
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              onChange={onChange}
                              inputRef={emojiRef}
                              id='select'
                              sx={{ height: '2.5rem', paddingTop: 2 }}
                              displayEmpty
                              renderValue={selected => {
                                if (selected === '' || !selected) {
                                  return <EmojiEmotionsIcon />
                                }

                                return selected
                              }}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              {emotions.map(e => (
                                <MenuItem key={e.value} value={e.value}>
                                  {e.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </Box>
                    </Box>

                    {props.photos && props.photos.length > 0 && (
                      <>
                        {fields.map((field, index) => (
                          <CardContent key={field.id}>
                            <IconButton onClick={() => remove(index)}>
                              <ClearIcon />
                            </IconButton>
                            <CardMedia component='img' height='500' image={props.photos[0]} alt='img' />
                          </CardContent>
                        ))}
                      </>
                    )}
                    <Button type='submit' sx={{ width: '10rem', mt: '5rem', ml: '30rem' }}>
                      Guardar
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Modal>
            <IconButton className={classes.iconButton} onClick={handleOpen} sx={{ marginLeft: 2 }}>
              <DeleteIcon />
            </IconButton>
            <Modal open={open} onClose={handleClose}>
              <Box component='div' sx={style}>
                <Typography variant='h6' component='h2'>
                  Deseas eliminar?
                </Typography>
                <Button
                  onClick={handleDelete}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', height: '3rem', fontSize: 'large' }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 1, marginRight: 6 }}>
                    <YesButton />
                  </div>
                  Si
                </Button>

                <Button
                  onClick={handleClose}
                  variant='contained'
                  sx={{ marginTop: 3, width: '50%', height: '3rem', fontSize: 'large' }}
                >
                  <div style={{ position: 'absolute', left: 28, top: 2, marginRight: 6 }}>
                    <NoButton />
                  </div>
                  No
                </Button>
              </Box>
            </Modal>
          </>
        }
        title={'Tú'}
        subheader={props.createdAt}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {props.content}
        </Typography>
      </CardContent>
      {props.photos && props.photos.length > 0 && (
        <>
          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}>
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout='auto' unmountOnExit>
            <CardContent>
              <CardMedia component='img' height='500' image={props.photos} alt='img' />
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  )
}

export default Entries

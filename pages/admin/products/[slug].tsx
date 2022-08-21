import { FC, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { IGender, IProduct, ISize, IType } from 'interfaces'
import { dbProducts } from 'database'
import { AdminLayout } from 'components/layouts'
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  ListItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { tesloApi } from 'api'

const validTypes: IType[] = ['shirts', 'pants', 'hoodies', 'hats']
const validGender: IGender[] = ['men', 'women', 'kid', 'unisex']
const validSizes: ISize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

interface FormData {
  _id: string
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ISize[]
  slug: string
  tags: string[]
  title: string
  type: IType
  gender: IGender
}

interface Props {
  product: IProduct
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const [newTagValue, setNewTagValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: product,
  })

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'title') {
        const regex = /[^a-zA-Z0-9_]/gi
        const newSlug = value.title?.trim().replaceAll(' ', '_').replaceAll(regex, '').toLocaleLowerCase() || ''
        setValue('slug', newSlug, { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, setValue])

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues('sizes')

    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter((s) => s != size),
        { shouldValidate: true }
      )
    }
    setValue('sizes', [...currentSizes, size], { shouldValidate: true })
  }
  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase()
    setNewTagValue('')
    const currentTags = getValues('tags')
    if (currentTags.includes(newTag)) return
    currentTags.push(newTag)
  }
  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter((t) => t !== tag)
    setValue('tags', updatedTags, { shouldValidate: true })
  }
  const onSubmit = async (form: FormData) => {
    // TODO: Better UX returning errors. Snackbar?
    if (form.images.length < 2) return alert('At least 2 images')
    setIsSaving(true)

    try {
      const { data } = await tesloApi({
        url: '/admin/products',
        method: 'PUT', //TODO: if we have an _id, update product, otherwise create product
        data: form,
      })
      console.log({ data })
      if (!form._id) {
        //TODO: Reload browser
      } else {
        setIsSaving(false)
      }
    } catch (error) {
      console.log(error)
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout title={'Producto'} subTitle={`Editing: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
          <Button
            color='secondary'
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type='submit'
            disabled={isSaving}
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Title'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Title must have at least 2 chars.' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label='Description'
              variant='filled'
              fullWidth
              multiline
              sx={{ mb: 1 }}
              {...register('description', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Description must have at least 2 chars.' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label='Stock'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('inStock', {
                required: 'This field is required',
                minLength: { value: 0, message: 'Min. value is 0.' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label='Price'
              type='number'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('price', {
                required: 'This field is required',
                minLength: { value: 0, message: 'Min. value is 0.' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) => setValue('type', target.value as IType, { shouldValidate: true })}
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => setValue('gender', target.value as IGender, { shouldValidate: true })}
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color='secondary' />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes').includes(size)} />}
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField
              label='Slug - URL'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              {...register('slug', {
                required: 'This field is required',
                validate: (val) => (val.trim().includes(' ') ? 'Spaces are not allowed in slug.' : undefined),
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label='Tags'
              variant='filled'
              fullWidth
              sx={{ mb: 1 }}
              helperText='Press [spacebar] to add'
              value={newTagValue}
              onChange={({ target }) => setNewTagValue(target.value)}
              onKeyDown={({ code }) => (code === 'Space' ? onNewTag() : undefined)}
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component='ul'
            >
              {getValues('tags').map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color='primary'
                    size='small'
                    sx={{ ml: 1, mt: 1 }}
                  />
                )
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display='flex' flexDirection='column'>
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button color='secondary' fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                Image upload
              </Button>

              <Chip label='You need at least 2 images' color='error' variant='outlined' />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component='img' className='fadeIn' image={`/products/${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color='error'>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = '' } = query

  const product = await dbProducts.getProductBySlug(slug.toString())

  if (!product) {
    return {
      redirect: {
        destination: '/admin/products',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
  }
}

export default ProductAdminPage
